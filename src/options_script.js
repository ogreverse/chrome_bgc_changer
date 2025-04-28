document.addEventListener('DOMContentLoaded', () => {
  CUI.load('cui_list', function () {
    const sd = CUI.storageData;
    if (typeof sd != {}) {
      for (let i = 0, len = sd['cui_list'].length; i < len; i++) {
        const dl = sd['cui_list'][i];
        makeInputArea(dl['url'], dl['bgColor'], dl['remark']);
      }
    }
  });

  document
    .querySelector('.operation__save-btn')
    .addEventListener('click', () => {
      CUI.save('cui_list', makeStorageData());

      const message = document.querySelector('.operation__message');
      message.textContent = '保存しました';
      setTimeout(() => {
        message.textContent = '';
      }, 3000);
    });

  document
    .querySelector('.operation__add-input-area-btn')
    .addEventListener('click', addInputArea);
});

/**
 * 入力値からデータを作成
 * @return {Array}
 */
function makeStorageData() {
  const data = [];
  document.querySelectorAll('.input-area__item').forEach((item) => {
    data.push({
      url: item.querySelector('input[name="url"]').value,
      bgColor: item.querySelector('input[name="bg_color"]').value,
      remark: item.querySelector('input[name="remark"]').value,
    });
  });
  return data;
}

/**
 * 入力エリアの追加
 */
function addInputArea() {
  makeInputArea('', '', '');
}

/**
 * 入力エリアの作成
 * @param url
 * @param bgColor
 * @param remark
 */
function makeInputArea(url, bgColor, remark) {
  const inputArea = document.querySelector('.input-area');
  const inputAreaItem = document.createElement('div');
  inputAreaItem.className = 'input-area__item';

  // ドメイン
  const urlLabel = document.createElement('label');
  urlLabel.htmlFor = 'url';
  urlLabel.innerHTML = getMes('label_url') + '：';

  const urlInput = document.createElement('input');
  urlInput.className = 'input-area__url';
  urlInput.type = 'text';
  urlInput.name = 'url';
  urlInput.value = url;

  // 背景色
  const bgColorLabel = document.createElement('label');
  bgColorLabel.htmlFor = 'bg_color';
  bgColorLabel.innerHTML = getMes('label_bg_color') + '：';

  const bgColorInput = document.createElement('input');
  bgColorInput.className = 'input-area__bg-color';
  bgColorInput.type = 'text';
  bgColorInput.name = 'bg_color';
  bgColorInput.value = bgColor;

  // カラーピッカー
  const colorPicker = document.createElement('input');
  colorPicker.className = 'input-area__color-picker';
  colorPicker.type = 'color';
  colorPicker.value = bgColor;

  // 背景色とカラーピッカーの連動
  bgColorInput.addEventListener('change', (e) => {
    colorPicker.value = e.target.value;
  });

  colorPicker.addEventListener('change', (e) => {
    bgColorInput.value = e.target.value;
  });

  // 備考欄
  const remarkLabel = document.createElement('label');
  remarkLabel.htmlFor = 'remark';
  remarkLabel.innerHTML = getMes('label_remark') + '：';

  const remarkInput = document.createElement('input');
  remarkInput.className = 'input-area__remark';
  remarkInput.type = 'text';
  remarkInput.name = 'remark';
  remarkInput.value = remark;

  // 削除ボタン
  const deleteButton = document.createElement('button');
  deleteButton.className = 'input-area__delete';
  deleteButton.innerHTML = getMes('delete');
  deleteButton.addEventListener('click', () => {
    inputAreaItem.remove();
  });

  // 要素の追加
  inputAreaItem.appendChild(urlLabel);
  inputAreaItem.appendChild(urlInput);
  inputAreaItem.appendChild(bgColorLabel);
  inputAreaItem.appendChild(bgColorInput);
  inputAreaItem.appendChild(colorPicker);
  inputAreaItem.appendChild(remarkLabel);
  inputAreaItem.appendChild(remarkInput);
  inputAreaItem.appendChild(deleteButton);

  inputArea.appendChild(inputAreaItem);
}

/**
 * メッセージを取得
 * @param key
 * @return {*}
 */
function getMes(key) {
  return chrome.i18n.getMessage(key);
}
