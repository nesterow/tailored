import { useEffect, useState } from "preact/hooks";
import ClickOutside from "@/components/ClickOutside.tsx";
import IconMenu from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/menu-2.tsx";

interface MenuButtonProps {
  target: string;
  container: string;
  toggleAddClass: string;
  toggleRemoveClass?: string;
  size?: number;
  color?: string;
  stroke?: number;
  className: string;
}

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

  return (
    <>
      <ClickOutside target={container} onClickOutside={deactivate} />
      <a onClick={toggle}>
        <IconMenu size={size} class={className} color={color} stroke={stroke} />
      </a>
    </>
  );
}
