import { JSX } from "preact";
import { MutableRef, useCallback, useEffect, useState } from "preact/hooks";
import { useClickOutside } from "../hooks/useClickOutside.ts";
import { useDomSelectorRef } from "../hooks/useDomSelectorRef.ts";
import { useEventListener } from "../hooks/useEventListener.ts";

import { MenuIcon } from "./_deps.ts";

type Ref = MutableRef<Element | HTMLElement | null>;
interface MenuButtonProps {
  target: string | Ref;
  container: string | Ref;
  className: string;
  toggleAddClass: string;
  toggleRemoveClass?: string;
  size?: number;
  color?: string;
  stroke?: number;
  children?: JSX.Element | JSX.Element[];
}

MenuButton.defaultProps = {
  size: 24,
  color: "black",
  stroke: 2,
} as MenuButtonProps;

/**
 * @hydrated
 *
 * Menu button behavior.
 * Switch between classes on the target element.
 *
 * @param target - CSS selector of the target element (menu wrapper).
 * @param container - CSS selector of the container element i.e header, used for the "click outside" behavour.
 * @param toggleAddClass - CSS class to add to the target element on activation.
 * @param toggleRemoveClass - CSS class to remove from the target element on activation.
 */
export default function MenuButton(
  {
    target,
    toggleAddClass,
    toggleRemoveClass,
    className,
    size,
    stroke,
    color,
    container,
    children,
  }: MenuButtonProps,
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
      targetRef.current?.classList.add(...classes);
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
    if (toggleRemoveClass && cl?.contains(toggleRemoveClass)) {
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
  useClickOutside(deactivate, container);

  return (
    <>
      <a onClick={toggle} className={className}>
        {children ?? (
          <MenuIcon
            size={size}
            color={color}
            stroke={stroke}
          />
        )}
      </a>
    </>
  );
}
