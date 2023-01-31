import { useContext } from "preact/hooks";
import { RenderContext } from "./context.ts";

/**
 * @returns fetch function with headers from context
 */
export function useFetch() {
  const { headers } = useContext(RenderContext);
  return async (url: string, options?: RequestInit) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        ...headers,
      },
    });
    if (response.ok) {
      return response;
    }
    throw new Error(response.statusText);
  };
}
