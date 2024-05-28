import { useFetch } from './use-fetch';
import { FetchOptions, UseFetchProps, FetchResult } from '../types';

export interface UsePostRequestProps extends Omit<UseFetchProps, 'method'> {}

const defaultOptions: FetchOptions = {
  method: 'POST',
  fetchOnMount: false,
  cache: 0,
  persistCache: false,
};

export function usePostRequest(props: UsePostRequestProps = {}): FetchResult {
  const { url, options } = props;
  const optionsOverride = { ...defaultOptions, ...options };
  const { data, error, isLoading, trigger, time } = useFetch({
    url,
    options: optionsOverride,
  });

  return {
    data,
    error,
    isLoading,
    trigger,
    time,
  };
}
