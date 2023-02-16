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
useClickOutside.__callnumber = 0;

export function useClickOutside(
  onClickOutside: () => void,
  refOrSelector: string | Ref | Ref[],
) {
  if (typeof document === "undefined") return;
  useClickOutside.__callnumber++;

  const refs$: Ref[] =
    (Array.isArray(refOrSelector) ? refOrSelector : [refOrSelector]).map(
      (ref) => {
        return (typeof ref === "string") ? useDomSelectorRef(ref, [ref]) : ref;
      },
    );

  // 1. unique event id for each use
  const eventId = useRandomId(
    `co-${useClickOutside.__callnumber}-`,
    [...refs$, onClickOutside],
  );

  // 2. document click event will trigger our custom event
  const documentOnClick = useCallback(function (e: Event) {
    if (refs$.some((ref$) => ref$.current?.contains(e.target as Node))) {
      // if some refs contain target, do nothing
      return;
    }

    for (const ref$ of refs$) {
      const event = new CustomEvent(eventId, {
        bubbles: true,
        cancelable: true,
      });
      // 3. ref will be event target
      ref$.current?.dispatchEvent(event);
      // propagate from first found
      return;
    }
  }, [eventId]);

  // 4. our custom event will trigger the callback
  const onCustomEvent: EventListener = useCallback(function (_event: Event) {
    onClickOutside();
  }, [onClickOutside]);

  // 5. we may need to know the eventId outside this scope, so we store it in the dataset
  useLayoutEffect(() => {
    for (const ref$ of refs$) {
      (ref$.current as HTMLBaseElement).dataset["clickOutside"] = eventId;
    }
  }, [...refs$]);

  // 6. we need to add event listeners to the owner document
  const ownerDocument = useRef(refs$[0].current?.ownerDocument ?? document);
  useEventListener("click", documentOnClick, ownerDocument, true);
  useEventListener(eventId, onCustomEvent, ownerDocument, {
    capture: true,
  });
}
