import useSharedContext from "./useSharedContext.ts";
import Context from "../context.ts";

/**
 * Use shared context to get headers and return fetch function.
 * @returns fetch function with headers from context
 */
export default function useFetch() {
  const { headers } = useSharedContext(Context);
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
