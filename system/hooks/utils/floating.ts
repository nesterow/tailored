import { MutableRef } from "preact/hooks";

import type {
  ComputePositionConfig,
  ComputePositionReturn,
  Middleware,
  SideObject,
  VirtualElement,
} from "https://esm.sh/@floating-ui/dom@1.2.1";

import { arrow as arrowCore } from "https://esm.sh/@floating-ui/dom@1.2.1";

export type {
  AlignedPlacement,
  Alignment,
  AutoPlacementOptions,
  AutoUpdateOptions,
  Axis,
  Boundary,
  ClientRectObject,
  ComputePositionConfig,
  ComputePositionReturn,
  Coords,
  DetectOverflowOptions,
  Dimensions,
  ElementContext,
  ElementRects,
  Elements,
  FlipOptions,
  FloatingElement,
  HideOptions,
  InlineOptions,
  Length,
  Middleware,
  MiddlewareArguments,
  MiddlewareData,
  MiddlewareReturn,
  MiddlewareState,
  NodeScroll,
  OffsetOptions,
  Padding,
  Placement,
  Platform,
  Rect,
  ReferenceElement,
  RootBoundary,
  ShiftOptions,
  Side,
  SideObject,
  SizeOptions,
  Strategy,
  VirtualElement,
} from "https://esm.sh/@floating-ui/dom@1.2.1";
export {
  autoPlacement,
  autoUpdate,
  computePosition,
  detectOverflow,
  flip,
  getOverflowAncestors,
  hide,
  inline,
  limitShift,
  offset,
  platform,
  shift,
  size,
} from "https://esm.sh/@floating-ui/dom@1.2.1";

type Prettify<T> =
  & {
    [K in keyof T]: T[K];
  }
  & Record<string, unknown>;

export type UseFloatingData = Prettify<
  Omit<ComputePositionReturn, "x" | "y"> & {
    x: number | null;
    y: number | null;
    isPositioned: boolean;
  }
>;

export type ReferenceType = Element | VirtualElement;

export type UseFloatingReturn<RT extends ReferenceType = ReferenceType> =
  Prettify<
    UseFloatingData & {
      /**
       * Update the position of the floating element, re-rendering the component
       * if required.
       */
      update: () => void;
      /**
       * @deprecated use `refs.setReference` instead.
       */
      reference: (node: RT | null) => void;
      /**
       * @deprecated use `refs.setFloating` instead.
       */
      floating: (node: HTMLElement | null) => void;
      refs: {
        reference: MutableRef<RT | null>;
        floating: MutableRef<HTMLElement | null>;
        setReference: (node: RT | null) => void;
        setFloating: (node: HTMLElement | null) => void;
      };
      elements: {
        reference: RT | null;
        floating: HTMLElement | null;
      };
    }
  >;

export type UseFloatingProps<RT extends ReferenceType = ReferenceType> =
  Prettify<
    Partial<ComputePositionConfig> & {
      whileElementsMounted?: (
        reference: RT,
        floating: HTMLElement,
        update: () => void,
      ) => void | (() => void);
      open?: boolean;
    }
  >;

export interface Options {
  element: MutableRef<Element | null> | Element;
  padding?: number | SideObject;
}

/**
 * A data provider that provides data to position an inner element of the
 * floating element (usually a triangle or caret) so that it is centered to the
 * reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
export const arrow = (options: Options): Middleware => {
  const { element, padding } = options;

  function isRef(value: unknown): value is MutableRef<unknown> {
    return Object.prototype.hasOwnProperty.call(value, "current");
  }

  return {
    name: "arrow",
    options,
    fn(args) {
      if (isRef(element)) {
        if (element.current != null) {
          return arrowCore({ element: element.current, padding }).fn(args);
        }

        return {};
      } else if (element) {
        return arrowCore({ element, padding }).fn(args);
      }

      return {};
    },
  };
};
