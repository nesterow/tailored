import { JSX } from "preact";
import {
  MutableRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "preact/hooks";
import { flip, inline, offset, shift } from "../hooks/utils/floating.ts";
import { usePosition } from "../hooks/usePosition.ts";
import { useEventListener } from "../hooks/useEventListener.ts";
import { useClickOutside } from "../hooks/useClickOutside.ts";

export interface PopoverProps {
  target: MutableRef<Element | null>;
  children: JSX.Element | JSX.Element[];
  className?: string;
  strategy?: "absolute" | "fixed";
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;
  trigger?: "click" | "hover" | "focus" | "manual";
  active?: boolean;
  inline?: boolean;
  clickOutside?: boolean;
  role?: string;
  arrow?: MutableRef<Element | null>;
}

Popover.defaultProps = {
  strategy: "absolute",
  position: "bottom",
  offset: 0,
  clickOutside: true,
  role: "tooltip",
} as Partial<PopoverProps>;

export default function Popover(props: PopoverProps) {
  const {
    offset: _offset,
    inline: _inline,
    strategy,
    target,
    className,
    role,
  } = props;
  const middleware = [
    offset(_offset),
    flip(),
    shift(),
  ];
  if (_inline) {
    middleware.push(inline());
  }
  const { x, y, refs, update } = usePosition({
    strategy,
    middleware,
  });

  const [active, setActive] = useState(
    props.active ?? false,
  );

  useLayoutEffect(() => {
    refs.setReference(target.current);
  }, [target]);

  useEventListener("scroll", update);
  useEventListener("resize", update);

  const close = useCallback(() => {
    setActive(false);
  }, []);

  const toggle = useCallback(() => {
    setActive(!active);
  }, []);

  const open = useCallback(() => {
    setActive(true);
  }, []);

  if (props.trigger === "click") {
    if (props.clickOutside) {
      useClickOutside(close, [
        refs.floating,
        refs.reference as MutableRef<Element>,
      ]);
      useEventListener(
        "click",
        open,
        refs.reference as MutableRef<Element>,
      );
    } else {
      useEventListener(
        "click",
        toggle,
        refs.reference as MutableRef<Element>,
      );
    }
  }

  useEffect(() => {
    return () => {};
  }, [strategy, target, className]);

  return (
    <div
      className={active ? className : undefined}
      ref={refs.setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        visibility: active ? "visible" : "hidden",
      }}
      aria-hidden={!active}
      data-active={active}
      role={role}
    >
      {props.children}
    </div>
  );
}
