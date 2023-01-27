import { useEffect, useState } from "preact/hooks";
import ClickOutside from "@/components/ClickOutside.tsx";
import IconMenu from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/menu-2.tsx";

interface MenuButtonProps {
  target: string;
  container: string;
  toggleClass: string;
  size?: number;
  color?: string;
  stroke?: number;
  className: string;
}

export default function MenuButton(
  { target, toggleClass, className, size, stroke, color, container }:
    MenuButtonProps,
) {
  const [active, setActive] = useState(false);
  const _classes = toggleClass.split(" ");

  function activate() {
    document.querySelectorAll(target).forEach((el) => {
      el.classList.add(..._classes);
    });
    setActive(true);
    console.log(target, _classes, document.querySelectorAll(target));
  }

  function deactivate() {
    document.querySelectorAll(target).forEach((el) => {
      el.classList.remove(..._classes);
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
  return (
    <>
      <ClickOutside target={container} onClickOutside={deactivate} />
      <a onClick={toggle}>
        <IconMenu size={size} class={className} color={color} stroke={stroke} />
      </a>
    </>
  );
}
