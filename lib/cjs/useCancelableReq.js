"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var rejectPromiseChain_1 = __importDefault(require("./rejectPromiseChain"));
function useCancelableReq(_a) {
    var src = _a.src, _b = _a.fetchParams, fetchParams = _b === void 0 ? {} : _b;
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(), res = _d[0], setRes = _d[1];
    var _e = (0, react_1.useState)(), error = _e[0], setError = _e[1];
    function onSetLoadingError(e) {
        setError(e);
        setIsLoading(false);
    }
    (0, react_1.useEffect)(function () {
        var isMounted = true;
        var controller = new AbortController();
        fetch(src, __assign(__assign({}, fetchParams), { signal: controller.signal }))
            .then(function (response) { return (isMounted ? setRes(response) : (0, rejectPromiseChain_1.default)()); })
            .catch(function (e) { return isMounted && onSetLoadingError(e); });
        return function () {
            isMounted = false;
            if (!controller.signal.aborted) {
                controller.abort();
            }
        };
    }, []);
    return {
        res: res,
        error: error,
        isLoading: isLoading,
    };
}
exports.default = useCancelableReq;
