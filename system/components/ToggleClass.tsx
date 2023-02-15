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
