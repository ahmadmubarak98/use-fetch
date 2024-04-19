import { fetcher as defaultFetcherFnc } from './utils/fetcher';
export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type FetchOptions = {
  /** Custom fetcher function. Default: {@link fetcher} */
  fetcher?: typeof defaultFetcherFnc;
  /** The HTTP method to use. Default: 'GET', can be one of {@link FetchMethod} */
  method?: FetchMethod;
  /** The payload (body | query) to send with the request. Default: undefined */
  payload?: any;
  /** The headers to send with the request. Default: {'Content-Type': 'application/json'} */
  headers?: Record<string, string>;
  /** Whether to fetch the data on component mount. Default: true when request is GET, false otherwise */
  fetchOnMount?: boolean;
  /** Cache duration in milliseconds. Default: 0 (no cache) */
  cache?: number; // in milliseconds
  /** Whether to persist the cache in local storage. Default: false */
  persistCache?: boolean;
};

export interface UseFetchProps {
  /** The URL to fetch. Example: 'https://api.example.com/data' */
  url?: string;
  options?: FetchOptions;
}

export interface TriggerOptions {
  url?: string;
  /** The payload to send with the request, in case of 'GET' method, it will be sent as query params */
  payload?: any;
  /** The headers to send with the request */
  headers?: Record<string, string>;
  /** Callback to be executed on success, it gives the fetched data as argument */
  onSuccess?: (data: any) => void;
  /** Callback to be executed on error, it gives the error as argument */
  onError?: (error: any) => void;
}

export interface FetchResult {
  /** The fetched data */
  data: any;
  /** The error if any */
  error: any;
  /** Whether the fetch is in progress, starts as true if {@link FetchOptions.fetchOnMount} is true */
  isLoading: boolean;
  /** The duration of the fetch in milliseconds */
  time: number;
  /** Triggers a new fetch, it takes {@link TriggerOptions} as argument */
  trigger: (triggerOptions?: TriggerOptions) => Promise<any>;
}

export interface State {
  data: any;
  error: any;
  isLoading: boolean;
  time: number;
}

export type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: any; time: number }
  | { type: 'FETCH_FAILURE'; payload: any; time: number };

export type Cache = {
  [key: string]: {
    data: any;
    expiry: number;
  };
};
