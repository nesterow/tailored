import { MutableRef, useLayoutEffect, useRef } from "preact/hooks";

/**
 * Handle css transition and/or animation end
 * @param onFinish
 * @param ref
 * @param inputs
 */
export function useCssPlayEnd(
  onFinish: () => void,
  ref: MutableRef<HTMLElement | null>,
  inputs: unknown[] = [],
) {
  const pendingAnimations = useRef<unknown | null>(null);
  useLayoutEffect(() => {
    pendingAnimations.current = null;
    const target = ref.current;
    let hasTransition = false;
    let hasAnimation = false;
    const animationend = () => {
      if (hasTransition && hasAnimation) {
        pendingAnimations.current = Promise.allSettled([
          new Promise((resolve) => {
            target!.ontransitionend = resolve;
            target!.ontransitioncancel = resolve;
          }),
          new Promise((resolve) => {
            target!.onanimationend = resolve;
            target!.onanimationcancel = resolve;
          }),
        ]).then(finish);
        return;
      }
      if (hasTransition) {
        target!.ontransitionend = finish;
        target!.ontransitioncancel = finish;
      } else if (hasAnimation) {
        target!.onanimationend = finish;
        target!.onanimationcancel = finish;
      }
    };
    const cleanup = () => {
      target!.ontransitionstart = null;
      target!.onanimationstart = null;
      target!.ontransitionend = null;
      target!.onanimationend = null;
      target!.ontransitioncancel = null;
      target!.onanimationcancel = null;
    };
    const finish = () => {
      onFinish();
      cleanup();
    };
    target!.ontransitionstart = (ev) => {
      if (ev.target !== target) return;
      hasTransition = true;
      animationend();
    };
    target!.onanimationstart = (ev) => {
      if (ev.target !== target) return;
      hasAnimation = true;
      animationend();
    };
    return cleanup;
  }, [...inputs]);
}
