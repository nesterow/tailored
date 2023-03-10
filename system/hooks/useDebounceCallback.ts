/**
MIT License

Copyright (c) 2023 Anton Nesterov, anton@demiurg.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
