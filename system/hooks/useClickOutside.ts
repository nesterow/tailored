import { MutableRef, useEffect, useRef } from "preact/hooks";

type Ref = MutableRef<Node | Element | null>;

/**
 * @hydrated
 *
 * Click outside hook, accepts an element ref or a selector string
 *
 * @param ref - element ref or selector string
 * @param onClickOutside - callback
 * @param inputs - dependencies
 */
export default function useClickOutside(
  ref: string | Ref,
  onClickOutside: () => void,
  inputs: unknown[] = [],
) {
  if (typeof document === "undefined") return;
  let _ref: Ref;
  if (typeof ref === "string") {
    _ref = useRef(document.querySelector(ref));
  } else {
    _ref = ref;
  }
  const ownerDocument = _ref.current?.ownerDocument ?? document;
  const listener = (e: MouseEvent) => {
    if (onClickOutside && !_ref.current?.contains(e.target as Node)) {
      onClickOutside();
    }
  };
  useEffect(() => {
    ownerDocument.addEventListener("click", listener, true);
    return () => {
      ownerDocument.removeEventListener("click", listener, true);
    };
  }, inputs);
}
