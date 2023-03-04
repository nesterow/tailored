import { Context } from "preact";
import { useContext, useDebugValue } from "preact/hooks";

/**
 * Use context to get headers and return fetch function.
 *
 * Usage:
 * ```
 *
 * import Context from "@/context.ts";
 * // ...
 * const _fetch = useContextFetch(Context);
 * const response = await _fetch("/api/endpoint", { method: "POST" });
 *
 * ```
 * @returns fetch function with headers from context
 */

type ContextWithHeaders = {
  headers?: HeadersInit;
};

export function useContextFetch<T>(
  Context: Context<T & ContextWithHeaders>,
) {
  useDebugValue("useContextFetch");
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
