import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../hooks/use-fetch";

describe("UseFetch Hook", () => {
  it("should fetch instantly without error", async () => {
    const { result } = renderHook(() =>
      useFetch({
        url: "https://example.com/success",
      }),
    );

    // Loading must be true, because trigger function is called on mount (useEffect)
    expect(result.current.isLoading).toBeTruthy();

    // Wait for data to be fetched
    await waitFor(() => expect(result.current.data).toBeDefined());

    console.log("xx", result.current.data);

    // Data must be defined
    expect(result.current.data).toBeDefined();

    // Error must be null
    expect(result.current.error).toBeNull();
  });

  it("should fetch with error", async () => {

    const { result } = renderHook(() =>
      useFetch({
        url: "https://example.com/error",
      }),
    );

    // Loading must be true, because trigger function is called on mount (useEffect)
    expect(result.current.isLoading).toBeTruthy();

    // Wait for data to be fetched
    await waitFor(() => expect(result.current.data).toBeDefined());

    // Data must be undefined
    expect(result.current.data).toBeNull();

    // Error must be defined
    expect(result.current.error).toBeDefined();
  });
});
