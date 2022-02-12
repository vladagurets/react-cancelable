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
import { useState, useEffect } from "react";
import rejectPromiseChain from "./rejectPromiseChain";
var RES_TYPES_TO_PARSER = {
    'json': 'json',
    'text': 'text',
    default: 'blob'
};
function getResParser(contentType) {
    if (contentType.includes('application/json')) {
        return RES_TYPES_TO_PARSER.json;
    }
    var type = contentType.split('/').shift();
    return type && RES_TYPES_TO_PARSER[type] || RES_TYPES_TO_PARSER.default;
}
export default function useCancelableReq(_a) {
    var src = _a.src, resType = _a.resType, _b = _a.fetchParams, fetchParams = _b === void 0 ? {} : _b, onComplete = _a.onComplete, onFail = _a.onFail;
    var _c = useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(), res = _d[0], setRes = _d[1];
    var _e = useState(), error = _e[0], setError = _e[1];
    function onSetError(e) {
        setError(e);
        setIsLoading(false);
        onFail && onFail(e);
    }
    function onSetRes(res) {
        setRes(res);
        setIsLoading(false);
        onComplete && onComplete(res);
    }
    function processRes(response, isMounted) {
        if (response.ok) {
            var resHandler = resType || getResParser(response.headers.get('Content-Type') || 'default');
            response[resHandler]()
                .then(function (_response) { return rejectOrCb(isMounted, onSetRes, _response); });
        }
        else {
            var resHandler = getResParser(response.headers.get('Content-Type') || 'default');
            response[resHandler]()
                .then(function (_response) { return rejectOrCb(isMounted, onSetError, _response); });
        }
    }
    function rejectOrCb(isMounted, cb) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        if (isMounted) {
            cb.apply(void 0, rest);
        }
        else {
            rejectPromiseChain();
        }
    }
    useEffect(function () {
        var isMounted = true;
        var controller = new AbortController();
        fetch(src, __assign(__assign({}, fetchParams), { signal: controller.signal }))
            .then(function (response) { return rejectOrCb(isMounted, processRes, response, isMounted); })
            .catch(function (error) { return rejectOrCb(isMounted, onSetError, error); });
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
