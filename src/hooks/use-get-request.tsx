import { useFetch } from './use-fetch';
import { FetchOptions, UseFetchProps, FetchResult } from '../types';

export interface UseGetRequestProps extends Omit<UseFetchProps, 'method'> {}

const defaultOptions: FetchOptions = {
  method: 'GET',
  fetchOnMount: true,
  cache: 0,
  persistCache: false,
};

export function useGetRequest(props: UseGetRequestProps): FetchResult {
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
