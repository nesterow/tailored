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
import { useDebounceCallback } from "../hooks/useDebounceCallback.ts";
import { useCssPlayEnd } from "../hooks/useCssPlayEnd.ts";

export interface PopoverProps {
  target: MutableRef<Element | null>;
  children: JSX.Element | JSX.Element[];
  className?: string;
  hideClassName?: string;
  strategy?: "absolute" | "fixed";
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;
  trigger?: "click" | "hover" | "focus" | "manual";
  active?: boolean;
  inline?: boolean;
  clickOutside?: boolean;
  debounce?: number;
  role?: string;
  arrow?: MutableRef<Element | null>;
}

Popover.defaultProps = {
  trigger: "click",
  strategy: "absolute",
  position: "bottom",
  offset: 0,
  clickOutside: true,
  role: "tooltip",
  debounce: 100,
} as Partial<PopoverProps>;

/**
 * Unstyled popover component
 */
export default function Popover(props: PopoverProps) {
  const {
    offset: _offset,
    inline: _inline,
    debounce,
    strategy,
    target,
    className,
    hideClassName,
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
    useEventListener(
      "blur",
      close.callback,
      refs.reference as MutableRef<Element>,
    );
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
    ["click", "hover"].includes(props.trigger!)
  ) {
    useClickOutside(close.immediate, [
      refs.floating,
      refs.reference as MutableRef<Element>,
    ]);
  }

  useCssPlayEnd(
    () => {
      refs.floating.current?.style.setProperty(
        "visibility",
        active ? "visible" : "hidden",
      );
    },
    refs.floating,
    [active],
  );

  useLayoutEffect(() => {
    const target = refs.floating.current;
    target!.className = "";
    if (active) {
      if (className) {
        target!.className = className;
      }
    } else {
      if (hideClassName) {
        target!.className = hideClassName;
      }
    }
  }, [active]);

  return (
    <div
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
