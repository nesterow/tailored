import { PreactContext } from "preact";
import { useContext } from "preact/hooks";
import Context from "./context.ts";
import { SHARED_CONTEXT_ID } from "./constants.ts";

/**
 * Agnostic hook to get context.
 * Use along with shared context.
 * @param ctx
 * @returns Context
 */
export function useSharedContext<Type>(ctx: PreactContext<Type>) {
  return typeof document !== "undefined" ? getSharedContext() : useContext(ctx);

  function getSharedContext(): Type {
    const sharedContext = document.getElementById(SHARED_CONTEXT_ID);
    if (sharedContext) {
      return JSON.parse(sharedContext.textContent || "{}");
    }
    return {} as Type;
  }
}

/**
 * Use shared context to get headers and return fetch function.
 * @returns fetch function with headers from context
 */
export function useFetch() {
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
