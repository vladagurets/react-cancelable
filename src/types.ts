type UseCancelableReqParams = {
  src: string;
  resType?: 'json' | 'text' | 'blob';
  fetchParams?: RequestInit;
  onFail?: (error: any) => void;
  onComplete?: (res: any) => void;
}

type UseCancelableReqReturn = {
  res?: Response;
  error?: Error;
  isLoading: boolean;
}

type UseCancelableImageParams = {
  src: string;
  fetchParams?: RequestInit;
  onFail?: (error: any) => void;
  onComplete?: (res: any) => void;
}

type UseCancelableImageReturn = {
  url?: string;
  error?: Error;
  isLoading: boolean;
}

type RejectOrCbOpts = {
  isMounted: boolean;
  data: any;
}
