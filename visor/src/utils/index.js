"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.generateUniqueId = exports.formatDate = void 0;
var formatDate = function (date, locale) {
    if (locale === void 0) { locale = 'en-US'; }
    return new Intl.DateTimeFormat(locale).format(date);
};
exports.formatDate = formatDate;
var generateUniqueId = function () {
    return "id_".concat(Math.random().toString(36).substr(2, 9));
};
exports.generateUniqueId = generateUniqueId;
var debounce = function (func, delay) {
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
exports.debounce = debounce;
