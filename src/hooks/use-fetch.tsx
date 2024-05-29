import { fetcher as defaultFetcherFnc } from "../utils/fetcher";
import { useEffect, useReducer } from "react";
import {
  Action,
  Cache,
  FetchOptions,
  UseFetchProps,
  FetchResult,
  State,
  TriggerOptions,
} from "../types";

const cache: Cache = {};

export const defaultOptions: FetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  fetchOnMount: true,
  cache: 0,
  persistCache: false,
  initialLoading: true,
  initialData: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        time: action.time,
        error: null,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        time: action.time,
      };
    default:
      throw new Error("Unhandled action type");
  }
}

const initialState: State = {
  data: null,
  error: null,
  isLoading: false,
  time: 0,
};

export function useFetch(props: UseFetchProps = {}): FetchResult {
  const { url, options } = props;
  const optionsOverride = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options?.headers },
  };

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    data: optionsOverride.initialData || null,
    isLoading: optionsOverride.initialLoading
      ? optionsOverride.initialLoading
      : !!optionsOverride.fetchOnMount,
  });

  const trigger = async (triggerOptions?: TriggerOptions): Promise<any> => {
    const {
      url: triggerUrl,
      payload: triggerPayload,
      headers: triggerHeaders,
      onSuccess,
      onError,
      onComplete,
    } = {
      ...optionsOverride,
      ...triggerOptions,
      url: triggerOptions?.url || url,
      payload: triggerOptions?.payload || optionsOverride.payload,
      headers: {
        ...optionsOverride.headers,
        ...triggerOptions?.headers,
      },
    } || {};
    const startTime = performance.now();
    dispatch({ type: "FETCH_INIT" });

    const cacheKey = `cache-${optionsOverride.method || "GET"}-${url}`;

    try {
      const cachedData =
        cache[cacheKey] || JSON.parse(localStorage.getItem(cacheKey) || "null");
      if (
        cachedData &&
        optionsOverride.cache &&
        cachedData.expiry > Date.now()
      ) {
        const duration = performance.now() - startTime;
        dispatch({
          type: "FETCH_SUCCESS",
          payload: cachedData.data,
          time: duration,
        });
        onSuccess?.(cachedData.data);
        return cachedData.data;
      }

      const fetcherFnc = optionsOverride.fetcher || defaultFetcherFnc;

      const data: Promise<any> = await fetcherFnc(
        triggerUrl!,
        optionsOverride.method!, // method is guaranteed to be defined, as it is set in defaultOptions
        triggerPayload ? triggerPayload : optionsOverride.payload,
        triggerHeaders ? triggerHeaders : optionsOverride.headers,
      );

      const duration = performance.now() - startTime;
      dispatch({ type: "FETCH_SUCCESS", payload: data, time: duration });

      if (optionsOverride.cache) {
        cache[cacheKey] = { data, expiry: Date.now() + optionsOverride.cache };

        if (optionsOverride.persistCache) {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data,
              expiry: Date.now() + optionsOverride.cache,
            }),
          );
          setTimeout(() => {
            delete cache[cacheKey];
            localStorage.removeItem(cacheKey);
          }, optionsOverride.cache);
        }
      }

      onSuccess?.(data);
    } catch (error) {
      const duration = performance.now() - startTime;
      dispatch({ type: "FETCH_FAILURE", payload: error, time: duration });
      onError?.(error);
    } finally {
      onComplete?.(state.data);
    }
  };

  useEffect(() => {
    if (optionsOverride.fetchOnMount) {
      trigger();
    }
  }, [url]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    time: state.time,
    trigger,
  };
}
