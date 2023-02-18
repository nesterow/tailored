import { JSX } from "preact";
import { MutableRef, useLayoutEffect, useState } from "preact/hooks";
import { arrow, flip, inline, offset, shift } from "../hooks/utils/floating.ts";
import type { Middleware } from "../hooks/utils/floating.ts";
import { usePosition } from "../hooks/usePosition.ts";
import { useEventListener } from "../hooks/useEventListener.ts";
import { useClickOutside } from "../hooks/useClickOutside.ts";
import { useDebounceCallback } from "../hooks/useDebounceCallback.ts";
import { useCssPlayEnd } from "../hooks/useCssPlayEnd.ts";

const INVPOS: Record<string, string> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

export interface PopoverProps {
  target: MutableRef<HTMLElement | null>;
  children: JSX.Element | JSX.Element[];
  className?: string;
  hideClassName?: string;
  strategy?: "absolute" | "fixed";
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
  trigger?: "click" | "hover" | "focus" | "manual";
  active?: boolean;
  inline?: boolean;
  clickOutside?: boolean;
  debounce?: number;
  role?: string;
  arrow?: MutableRef<HTMLElement | null>;
  middlewares?: Middleware[];
}

Popover.defaultProps = {
  trigger: "click",
  strategy: "absolute",
  placement: "bottom",
  offset: 0,
  clickOutside: true,
  role: "tooltip",
  debounce: 100,
  middlewares: [],
} as Partial<PopoverProps>;

/**
 * Unstyled popover component
 */
export default function Popover(props: PopoverProps) {
  const {
    offset: _offset,
    inline: _inline,
    arrow: _arrow,
    debounce,
    strategy,
    target,
    className,
    hideClassName,
    role,
  } = props;
  const clickOutsideTriggers = [
    "click",
    "hover",
  ];
  const middleware = [
    offset(_offset),
    flip(),
    shift(),
  ];
  if (_inline) {
    middleware.push(inline());
  }
  if (_arrow) {
    middleware.push(arrow({
      element: _arrow,
    }));
  }
  if (props.middlewares?.length) {
    middleware.push(...props.middlewares);
  }
  const { x, y, placement, refs, update, middlewareData } = usePosition({
    strategy,
    placement: props.placement,
    middleware,
    isPositioned: props.active ?? false,
  });

  const [active, setActive] = useState(
    props.active ?? false,
  );

  useLayoutEffect(() => {
    refs.setReference(target.current);
  }, [target]);

  useEventListener("scroll", update);
  useEventListener("resize", update);

  const toggle = useDebounceCallback(() => {
    setActive(!active);
  }, debounce);

  const open = useDebounceCallback(() => {
    close.cancel();
    setActive(true);
  }, debounce);

  const close = useDebounceCallback(() => {
    setActive(false);
  }, debounce);

  if (props.trigger === "hover") {
    useEventListener(
      "mouseenter",
      open.immediate,
      [
        refs.floating as MutableRef<Element>,
        refs.reference as MutableRef<Element>,
      ],
    );
    useEventListener(
      "mouseleave",
      close.callback,
      [
        refs.floating as MutableRef<Element>,
        refs.reference as MutableRef<Element>,
      ],
    );
  }

  if (props.trigger === "focus") {
    useEventListener(
      "focus",
      open.immediate,
      refs.reference as MutableRef<Element>,
    );
    if (!props.clickOutside) {
      useEventListener(
        "blur",
        close.callback,
        refs.reference as MutableRef<Element>,
      );
    } else {
      clickOutsideTriggers.push("focus");
    }
  }

  if (props.trigger === "click") {
    useEventListener(
      "click",
      toggle.immediate,
      refs.reference as MutableRef<Element>,
    );
  }

  if (
    props.clickOutside &&
    clickOutsideTriggers.includes(props.trigger!)
  ) {
    useClickOutside(close.immediate, [
      refs.floating,
      refs.reference as MutableRef<Element>,
    ], "mousedown");
  }

  useLayoutEffect(() => {
    const target = refs.floating.current;
    target!.className = "";
    if (active) {
      if (className) {
        target!.className = className;
      }
    } else {
      if (hideClassName) {
        target!.className += hideClassName;
      }
    }
    updatearrow();
  }, [active]);

  useCssPlayEnd(
    () => {
      refs.floating.current?.style.setProperty(
        "visibility",
        active ? "visible" : "hidden",
      );
      updatearrow();
    },
    refs.floating,
    [active],
  );

  return (
    <div
      ref={refs.setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        visibility: "hidden",
      }}
      aria-hidden={!active}
      data-active={active}
      role={role}
    >
      {props.children}
    </div>
  );

  /* Special methods */

  function updatearrow() {
    if (_arrow && middlewareData.arrow) {
      const el = _arrow?.current!;
      const style = el.style;
      const { x, y } = middlewareData.arrow;
      if (x) {
        style.setProperty("left", x + "px");
      }
      if (y) {
        style.setProperty("top", y + "px");
      }
      const offset = el.getBoundingClientRect().width!;
      style.setProperty(placement, null);
      style.setProperty(
        INVPOS[placement],
        `-${offset}px`,
      );
      el.dataset["placement"] = INVPOS[placement];
    }
  }
}
