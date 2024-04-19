import * as matchers from "@testing-library/jest-dom/matchers";
import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import createFetchMock from "vitest-fetch-mock";
import { beforeAll, expect, vi } from "vitest";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}
expect.extend(matchers);

export const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeAll(() => {
  fetchMocker.mockIf(/^https?:\/\/example.com.*$/, (req) => {
    sleep(5000);

    if (req.url.endsWith("/error")) {
      return {
        status: 404,
        body: "Not Found",
      };
    }

    return JSON.stringify({
      data: {
        id: 1,
        name: "John Doe",
      },
    });
  });
});
