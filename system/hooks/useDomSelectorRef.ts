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

import { useDebugValue, useLayoutEffect, useRef } from "preact/hooks";
/**
 * Get a ref to an element by dom selector. Uses a MutationObserver to update the ref. Be careful.
 *
 * Useful when you need to work with native DOM APIs, for example, when some part of the DOM is rendered
 * by server-side code (i.e. when the app layout is rendered by the server).
 * Common use cases: click outside, layout styles, dataset attributes, web components, etc.;
 *
 * You should avoid using this kind of approach if the rendered dom is outside of component subtree.
 */
export function useDomSelectorRef<T>(selector: string, inputs?: unknown[]) {
  if (typeof document === "undefined") return useRef(null);

  const ref = useRef<HTMLElement | Element | null>(null);
  const setRef = () => {
    ref.current = document.querySelector(selector);
  };
  const noop = "_noop";
  useLayoutEffect(() => {
    setRef();
    const observer = new MutationObserver(setRef);
    observer.observe(ref.current!, {
      subtree: false,
      attributes: true,
      attributeOldValue: true,
      attributeFilter: [
        "id",
        "class",
        selector.includes("[") // [a="b"]
          ? selector.replace(/(\[|\])/g, "").split("=").shift() || noop
          : noop,
      ],
    });
    return () => {
      observer.disconnect();
    };
  }, inputs ?? [selector]);
  useDebugValue("useDomSelectorRef", () => ref.current);
  return ref;
}
