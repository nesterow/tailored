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

import { JSX } from "preact";
import { MutableRef, useCallback, useEffect, useState } from "preact/hooks";
import { useClickOutside } from "../hooks/useClickOutside.ts";
import { useDomSelectorRef } from "../hooks/useDomSelectorRef.ts";
import { useEventListener } from "../hooks/useEventListener.ts";

type Ref = MutableRef<Element | HTMLElement | null>;
export interface ToggleClassProps {
  target: string | Ref;
  clickOutside?: string | Ref;
  className: string;
  toggleAddClass: string;
  toggleRemoveClass?: string;
  children?: JSX.Element | JSX.Element[];
}

/**
 * @hydrated
 *
 * Toggle class behavior.
 * Switch between classes on the target element.
 *
 * @param {Ref | string} target - target element (menu wrapper).
 * @param {Ref | string} clickOutside - container element i.e header, used for the "click outside" behavour.
 * @param {string} toggleAddClass - CSS class to add to the target element on activation.
 * @param {string} toggleRemoveClass - CSS class to remove from the target element on activation.
 */
export default function ToggleClass(
  {
    target,
    toggleAddClass,
    toggleRemoveClass,
    className,
    clickOutside,
    children,
  }: ToggleClassProps,
) {
  const [active, setActive] = useState(false);
  const classes = toggleAddClass.split(" ");
  const removeClasses = toggleRemoveClass?.split(" ");
  const targetRef = typeof target === "string"
    ? useDomSelectorRef(target)
    : target;
  const deps = [target, toggleAddClass, toggleRemoveClass];

  const activate = useCallback(function () {
    const cl = targetRef.current?.classList;
    if (!cl?.contains(toggleAddClass)) {
      cl?.add(...classes);
    }
    if (toggleRemoveClass && cl?.contains(toggleRemoveClass)) {
      cl?.remove(...removeClasses!);
    }
    setActive(true);
  }, deps);

  const deactivate = useCallback(function () {
    const cl = targetRef.current?.classList;
    if (cl?.contains(toggleAddClass)) {
      cl?.remove(...classes);
    }
    if (toggleRemoveClass && !cl?.contains(toggleRemoveClass)) {
      cl?.add(...removeClasses!);
    }
    setActive(false);
  }, deps);

  const toggle = () => active ? deactivate() : activate();

  const onResize = useCallback(function () {
    deactivate();
  }, [deactivate]);

  const onKeyDown = useCallback(function (e: Event) {
    const event = e as KeyboardEvent;
    if (event.key === "Escape") {
      deactivate();
    }
  }, [deactivate]);

  useEventListener("resize", onResize);
  useEventListener("keydown", onKeyDown);
  if (clickOutside) {
    useClickOutside(deactivate, clickOutside);
  }

  return (
    <>
      <a onClick={toggle} className={className}>
        {children}
      </a>
    </>
  );
}
