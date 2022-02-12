import { useState } from "react";
import useCancelableReq from "./useCancelableReq";
export default function useCancelableImage(_a) {
    var src = _a.src, _b = _a.fetchParams, fetchParams = _b === void 0 ? {} : _b, onComplete = _a.onComplete, onFail = _a.onFail;
    var _c = useState(), url = _c[0], setUrl = _c[1];
    var _d = useCancelableReq({
        src: src,
        fetchParams: fetchParams,
        resType: 'blob',
        onComplete: handleFetchComplete,
        onFail: onFail
    }), isLoading = _d.isLoading, error = _d.error;
    function handleFetchComplete(blob) {
        var imageObjectURL = URL.createObjectURL(blob);
        setUrl(imageObjectURL);
        onComplete && onComplete(imageObjectURL);
    }
    return {
        url: url,
        error: error,
        isLoading: isLoading,
    };
}
