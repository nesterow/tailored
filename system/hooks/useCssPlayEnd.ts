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
  MutableRef,
  useDebugValue,
  useLayoutEffect,
  useRef,
} from "preact/hooks";

/**
 * Handle css transition and/or animation end.
 * Layout effect.
 *
 * @param onFinish
 * @param ref
 * @param inputs
 */
export function useCssPlayEnd(
  onFinish: () => void,
  ref: MutableRef<HTMLElement | null>,
  inputs: unknown[] = [],
) {
  useDebugValue("useCssPlayEnd", () => ref.current);
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
    setTimeout(() => {
      if (!hasTransition && !hasAnimation) {
        onFinish();
      }
    });
    return cleanup;
  }, inputs);
}
