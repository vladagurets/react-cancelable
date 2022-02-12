declare type UseCancelableReqParams = {
    src: string;
    fetchParams?: RequestInit;
};
declare type UseCancelableReqReturn = {
    res?: Response;
    error?: Error;
    isLoading: boolean;
};
