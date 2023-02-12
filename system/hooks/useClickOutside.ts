import {
  MutableRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "preact/hooks";

type Ref = MutableRef<Node | Element | null>;

/**
 * @hydrated
 *
 * Click outside hook, accepts an element ref or a selector string
 *
 * @param onClickOutside - callback
 * @param ref - element ref or selector string
 * @param inputs - dependencies
 */
export default function useClickOutside(
  onClickOutside: () => void,
  ref: string | Ref,
  inputs?: unknown[],
) {
  if (typeof document === "undefined") return;

  let _ref: Ref;
  if (typeof ref === "string") {
    _ref = useRef(document.querySelector(ref));
  } else {
    _ref = ref;
  }

  // 1. we use unique event ids for each use
  const eventId = useMemo(
    () => `co-${Math.random().toString(36).substring(2, 9)}`,
    inputs ?? [ref, onClickOutside],
  );

  // 2. document click event will trigger our custom event
  const documentOnClick = useCallback(function (e: MouseEvent) {
    if (!_ref.current?.contains(e.target as Node)) {
      const event = new CustomEvent(eventId, {
        bubbles: true,
        cancelable: true,
      });
      // 3. ref will be event target
      _ref.current?.dispatchEvent(event);
    }
  }, inputs ?? [ref, onClickOutside]);

  // 4. our custom event will trigger the callback
  const onCustomEvent: EventListener = useCallback(function (_event: Event) {
    onClickOutside();
  }, inputs ?? [ref, onClickOutside]);

  useEffect(() => {
    // 5. in order to manage event propagation in our side effects
    // we need to know the eventId, so we store it in the dataset
    (_ref.current as HTMLBaseElement).dataset["clickOutside"] = eventId;

    // 6. we need to add event listeners to the owner document
    const ownerDocument = _ref.current?.ownerDocument ?? document;
    ownerDocument.addEventListener("click", documentOnClick, true);
    ownerDocument.addEventListener(eventId, onCustomEvent, {
      capture: true,
    });
    return () => {
      ownerDocument.removeEventListener("click", documentOnClick, true);
      ownerDocument.removeEventListener(eventId, onCustomEvent, {
        capture: true,
      });
    };
  }, inputs ?? [ref, onClickOutside]);
}
