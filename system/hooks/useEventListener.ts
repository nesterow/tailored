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
