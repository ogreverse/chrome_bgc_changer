$(function () {
    CUI.load('cui_list', callback);
});

function callback() {
    var sd = CUI.storageData;
    if (typeof sd == {}) {
        return;
    }

    for (var i=0, len=sd['cui_list'].length; i < len; i++) {
        var dl = sd['cui_list'][i];
        if (CUI.isMatched(dl['url'])) {
            makeBorder(dl['bgColor']);
            return;
        }
    }
}

/**
 * 左側にボーダーを作成する
 * @param bgColor
 */
function makeBorder(bgColor) {
    $('<div></div>', {
        addClass: 'color-void',
        css: {
            position: 'fixed',
            width: '5px',
            height: '100vh',
            background: bgColor,
            zIndex: '9999'
        }
    }).prependTo('body');
}