$(function () {
    CUI.load('cui_list', function() {
        var sd = CUI.storageData;
        if (typeof sd != {}) {
            for (var i=0, len=sd['cui_list'].length; i < len; i++) {
                var dl = sd['cui_list'][i];
                makeInputArea(dl['url'], dl['bgColor'], dl['remark']);
            }
        }
    });

    $('.operation__save-btn').on('click', function() {
        CUI.save('cui_list', makeStorageData());
    });

    $('.operation__add-input-area-btn').on('click', addInputArea);
});

/**
 * 入力値からデータを作成
 * @return {Array}
 */
function makeStorageData() {
    var data = [];
    $('.input-area__item').each(function() {
        var item = $(this);
        data.push({
            'url': item.children('input[name="url"]').val(),
            'bgColor': item.children('input[name="bg_color"]').val(),
            'remark': item.children('input[name="remark"]').val()
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
    var inputAreaItem = $('<div></div>', {
        addClass: 'input-area__item'
    }).appendTo('.input-area');

    // ドメイン
    $('<label></label>', {
        for: 'url',
        html: getMes('label_url') + '：'
    }).appendTo(inputAreaItem);
    $('<input>', {
        addClass: 'input-area__url',
        type: 'text',
        name: 'url',
        value: url
    }).appendTo(inputAreaItem);

    // 背景色
    $('<label></label>', {
        for: 'bg_color',
        html: getMes('label_bg_color') + '：'
    }).appendTo(inputAreaItem);
    $('<input>', {
        addClass: 'input-area__bg-color',
        type: 'text',
        name: 'bg_color',
        value: bgColor,
        on: {
            change: function() {
                var color = $(this).val();
                $(this).parent().children('.input-area__color-picker').val(color);
            }
        }
    }).appendTo(inputAreaItem);

    // カラーピッカー
    $('<input>', {
        addClass: 'input-area__color-picker',
        type: 'color',
        value: bgColor,
        on: {
            change: function() {
                var color = $(this).val();
                $(this).parent().children('.input-area__bg-color').val(color);
            }
        }
    }).appendTo(inputAreaItem);

    // 備考欄
    $('<label></label>', {
        for: 'remark',
        html: getMes('label_remark') + '：'
    }).appendTo(inputAreaItem);
    $('<input>', {
        addClass: 'input-area__remark',
        type: 'text',
        name: 'remark',
        value: remark
    }).appendTo(inputAreaItem);

    // 削除ボタン
    $('<button></button>', {
        addClass: 'input-area__delete',
        on: {
            click: function(evt) {
                $(this).parent().remove();
            }
        },
        html: getMes('delete')
    }).appendTo(inputAreaItem);
}

/**
 * メッセージを取得
 * @param key
 * @return {*}
 */
function getMes(key) {
    return chrome.i18n.getMessage(key);
}