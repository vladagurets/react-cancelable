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
