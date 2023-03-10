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
  useEffect,
  useLayoutEffect,
  useRef,
} from "preact/hooks";

export function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends
    | Document
    | Element
    | HTMLElement
    | MediaQueryList
    | typeof globalThis,
>(
  eventName: KW | KH | KM | string,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event,
  ) => void,
  element?: MutableRef<T> | MutableRef<T>[],
  options?: boolean | AddEventListenerOptions,
) {
  useDebugValue("useEventListener", () => [eventName, element, options]);
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targets = Array.isArray(element)
      ? element.filter((e) => !!e.current).map((e) => e.current)
      : [element?.current ?? globalThis];
    const listener: typeof handler = (event) => {
      savedHandler.current(event);
    };
    targets.forEach((target) => {
      if (!(target && target.addEventListener)) return;
      target.addEventListener(eventName, listener, options);
    });
    // Remove event listener on cleanup
    return () => {
      targets.forEach((target) => {
        target.removeEventListener(eventName, listener, options);
      });
    };
  }, [eventName, element, options]);
}
