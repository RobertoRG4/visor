export var formatDate = function (date, locale) {
    if (locale === void 0) { locale = 'en-US'; }
    return new Intl.DateTimeFormat(locale).format(date);
};
export var generateUniqueId = function () {
    return "id_".concat(Math.random().toString(36).substr(2, 9));
};
export var debounce = function (func, delay) {
    var timeoutId;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            func.apply(void 0, args);
        }, delay);
    };
};
