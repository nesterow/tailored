import { PreactContext } from "preact";
import { useContext } from "preact/hooks";
import { RenderContext } from "./context.ts";

export function useSharedContext<Type>(ctx: PreactContext<Type>) {
  return typeof document !== "undefined" ? getSharedContext() : useContext(ctx);

  function getSharedContext(): Type {
    const sharedContext = document.getElementById("shared-context");
    if (sharedContext) {
      return JSON.parse(sharedContext.textContent || "{}");
    }
    return {} as Type;
  }
}

/**
 * @returns fetch function with headers from context
 */
export function useFetch() {
  const { headers } = useSharedContext(RenderContext);
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
