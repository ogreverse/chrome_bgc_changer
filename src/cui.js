const CUI = {};
CUI.storage = chrome.storage.local;
CUI.storageData = {};

/**
 * ストレージに保存する
 * @param k
 * @param v
 */
CUI.save = function(k, v) {
    var base = CUI.storageData;
    base[k] = v;
    CUI.storage.set(base, function() {
        console.log('saved');
    });
};

/**
 * ストレージから読み込む
 * @param k
 * @param callback
 */
CUI.load = function(k, callback) {
    CUI.storage.get(k, function(value) {
        CUI.storageData = value;

        callback();
    });
};

/**
 * urlにドメインが含まれているかチェックする
 * @param condition
 * @return {boolean}
 */
CUI.isMatched = function(condition) {
    var url = location.href;
    condition = condition.replace(/([.?+\/])/g, '\\$1').replace(/\*\*/g, '.+?').replace(/\*/g, '[\\w%+.-]+');
    var pattern = new RegExp(condition);
    var result = url.match(pattern);

    return result != null;
};