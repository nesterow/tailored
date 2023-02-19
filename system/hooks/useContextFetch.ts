import { Context } from "preact";
import { useContext } from "preact/hooks";

/**
 * Use context to get headers and return fetch function.
 * @returns fetch function with headers from context
 */

type ContextWithHeaders = {
  headers?: HeadersInit;
};

export default function useContextFetch<T>(
  Context: Context<T & ContextWithHeaders>,
) {
  const { headers } = useContext(Context);
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
