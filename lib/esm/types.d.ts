declare type UseCancelableReqParams = {
    src: string;
    resType?: 'json' | 'text' | 'blob';
    fetchParams?: RequestInit;
    onFail?: (error: any) => void;
    onComplete?: (res: any) => void;
};
declare type UseCancelableReqReturn = {
    res?: Response;
    error?: Error;
    isLoading: boolean;
};
declare type UseCancelableImageParams = {
    src: string;
    fetchParams?: RequestInit;
    onFail?: (error: any) => void;
    onComplete?: (res: any) => void;
};
declare type UseCancelableImageReturn = {
    url?: string;
    error?: Error;
    isLoading: boolean;
};
declare type RejectOrCbOpts = {
    isMounted: boolean;
    data: any;
};
