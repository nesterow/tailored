import { MutableRef, useCallback, useLayoutEffect, useRef } from "preact/hooks";
import { useDomSelectorRef } from "./useDomSelectorRef.ts";
import { useRandomId } from "./useRandomId.ts";
import { useEventListener } from "./useEventListener.ts";

type Ref = MutableRef<Node | Element | null>;

/**
 * @hydrated
 *
 * Click outside hook, accepts an element ref or a selector string
 *
 * @param onClickOutside - callback
 * @param refOrSelector - element ref or selector string
 * @param inputs - dependencies
 */
export function useClickOutside(
  onClickOutside: () => void,
  refOrSelector: string | Ref,
  inputs?: unknown[],
) {
  if (typeof document === "undefined") return;

  const ref$: Ref = (typeof refOrSelector === "string")
    ? useDomSelectorRef(refOrSelector, inputs ?? [refOrSelector])
    : refOrSelector;

  // 1. we use unique event ids for each use
  const eventId = useRandomId(
    { prefix: "co", length: 12 },
    inputs ?? [onClickOutside],
  );

  // 2. document click event will trigger our custom event
  const documentOnClick = useCallback(function (e: Event) {
    if (!ref$.current?.contains(e.target as Node)) {
      const event = new CustomEvent(eventId, {
        bubbles: true,
        cancelable: true,
      });
      // 3. ref will be event target
      ref$.current?.dispatchEvent(event);
    }
  }, inputs ?? [ref$, eventId]);

  // 4. our custom event will trigger the callback
  const onCustomEvent: EventListener = useCallback(function (_event: Event) {
    onClickOutside();
  }, inputs ?? [onClickOutside]);

  // 5. we may need to know the eventId outside this scope, so we store it in the dataset
  useLayoutEffect(() => {
    (ref$.current as HTMLBaseElement).dataset["clickOutside"] = eventId;
  }, inputs ?? [ref$]);

  // 6. we need to add event listeners to the owner document
  const ownerDocument = useRef(ref$.current?.ownerDocument ?? document);
  useEventListener("click", documentOnClick, ownerDocument, true);
  useEventListener(eventId, onCustomEvent, ownerDocument, {
    capture: true,
  });
}
