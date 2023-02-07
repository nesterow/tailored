import { SHARED_CONTEXT_ID } from "../constants.ts";
import { PreactContext } from "preact";
import { useContext } from "preact/hooks";

/**
 * @hydrated
 *
 * Agnostic hook to get context.
 * Use along with shared context.
 *
 * @param ctx
 * @returns Context
 */
export default function useSharedContext<Type>(ctx: PreactContext<Type>) {
  return typeof document !== "undefined" ? getSharedContext() : useContext(ctx);

  function getSharedContext(): Type {
    const sharedContext = document.getElementById(SHARED_CONTEXT_ID);
    if (sharedContext) {
      return JSON.parse(sharedContext.textContent || "{}");
    }
    return {} as Type;
  }
}
