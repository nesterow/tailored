import {
  useCallback,
  useDebugValue,
  useLayoutEffect,
  useRef,
} from "preact/hooks";

/**
 * Debounce callback function.
 *
 * Usage:
 * ```
 * const { callback, cancel, immediate } = useDebounceCallback(
 *  (value) => {
 *   console.log("call me no more than once a second", value);
 * },
 * 1000
 * );
 * ```
 *
 * @param callback$ Callback function
 * @param wait Wait time in milliseconds
 * @param inputs Inputs to watch for changes
 * @returns Callback function, cancel function and immediate function
 */
// deno-lint-ignore no-explicit-any
export function useDebounceCallback<T extends any>(
  callback$: (...args: unknown[]) => void,
  wait = 0,
  inputs: unknown[] = [],
) {
  const args$ = useRef<unknown[]>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const cancel = useCallback(function () {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  const callback = useCallback(function (
    ...args: unknown[]
  ) {
    args$.current = args;
    cancel();
    timeout.current = setTimeout(() => {
      if (args$.current) {
        callback$(...args$.current);
      }
    }, wait);
  }, [callback$, wait, ...inputs]);

  const immediate = useCallback(function (...args: unknown[]) {
    callback$(...args);
    cancel();
  }, [callback$, ...inputs]);

  useLayoutEffect(() => cancel, []);
  const methods = { callback, cancel, immediate };
  useDebugValue("useDebounceCallback", () => [wait, methods]);
  return methods;
}
