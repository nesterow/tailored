import { useDebugValue, useLayoutEffect, useRef } from "preact/hooks";

export function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  useDebugValue("useLatestRef", () => ref);
  return ref;
}
