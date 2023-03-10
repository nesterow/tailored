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
  useCallback,
  useDebugValue,
  useLayoutEffect,
  useRef,
} from "preact/hooks";
import { useDomSelectorRef } from "./useDomSelectorRef.ts";
import { usePrefixId } from "./usePrefixId.ts";
import { useEventListener } from "./useEventListener.ts";

type Ref = MutableRef<Node | Element | null>;

/**
 * @hydrated
 *
 * Click outside hook, accepts an element ref or a selector string
 *
 * @param onClickOutside - callback
 * @param refOrSelector - element ref or selector string
 * @param eventType - click (default), mousedown, etc.
 */
useClickOutside.__callNId$ = 0;

export function useClickOutside(
  onClickOutside: () => void,
  refOrSelector: string | Ref | Ref[],
  eventType = "click",
) {
  if (typeof document === "undefined") return;

  const refs$: Ref[] =
    (Array.isArray(refOrSelector) ? refOrSelector : [refOrSelector]).map(
      (ref) => {
        return (typeof ref === "string") ? useDomSelectorRef(ref, [ref]) : ref;
      },
    );
  useDebugValue("useClickOutside", () => [refs$, eventType]);

  // 1. unique event id for each use
  const eventId = usePrefixId(
    `${eventType}-${++useClickOutside.__callNId$}-`,
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
  useEventListener(eventType, documentOnClick, ownerDocument, true);
  useEventListener(eventId, onCustomEvent, ownerDocument, {
    capture: true,
  });
}
