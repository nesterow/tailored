import { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import useClickOutside from "../hooks/useClickOutside.ts";
import { MenuIcon } from "./_deps.ts";

interface MenuButtonProps {
  target: string;
  container: string;
  toggleAddClass: string;
  toggleRemoveClass?: string;
  size?: number;
  color?: string;
  stroke?: number;
  className: string;
  children?: JSX.Element | JSX.Element[];
}

MenuButton.defaultProps = {
  size: 24,
  color: "black",
  stroke: 2,
} as MenuButtonProps;

/**
 * @hydrated
 * Menu button behavior.
 * Switch between classes on the target element.
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
  const _classes = toggleAddClass.split(" ");
  const _removeClasses = toggleRemoveClass?.split(" ");

  function activate() {
    document.querySelectorAll(target).forEach((el) => {
      el.classList.add(..._classes);
      if (_removeClasses) {
        el.classList.remove(..._removeClasses);
      }
    });
    setActive(true);
  }

  function deactivate() {
    document.querySelectorAll(target).forEach((el) => {
      el.classList.remove(..._classes);
      if (_removeClasses) {
        el.classList.add(..._removeClasses);
      }
    });
    setActive(false);
  }

  function toggle() {
    if (active) {
      deactivate();
    } else {
      activate();
    }
  }

  useEffect(() => {
    const keyListener = function (e: KeyboardEvent) {
      if (e.key === "Escape") {
        deactivate();
      }
    };
    const resizeListener = function () {
      deactivate();
    };
    globalThis.addEventListener("resize", resizeListener);
    globalThis.addEventListener("keydown", keyListener);
    return () => {
      globalThis.removeEventListener("keydown", keyListener);
      globalThis.removeEventListener("resize", resizeListener);
    };
  }, []);

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
