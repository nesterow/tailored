/**
 * Ported from @floating-ui/react-dom
 */
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { computePosition } from "./utils/floating.ts";
import type {
  ComputePositionConfig,
  ReferenceType,
  UseFloatingData,
  UseFloatingProps,
  UseFloatingReturn,
} from "./utils/floating.ts";

import { useLatestRef } from "./useLatestRef.ts";
import { deepEqual } from "./utils/deepEqual.ts";

/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/react
 */
export function usePosition<RT extends ReferenceType = ReferenceType>(
  options: UseFloatingProps = {},
): UseFloatingReturn<RT> {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform,
    whileElementsMounted,
    open,
  } = options;

  const [data, setData] = useState<UseFloatingData>({
    x: null,
    y: null,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false,
  });

  const [latestMiddleware, setLatestMiddleware] = useState(middleware);

  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }

  const referenceRef = useRef<RT | null>(null);
  const floatingRef = useRef<HTMLElement | null>(null);
  const dataRef = useRef(data);

  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform);

  const [reference, _setReference] = useState<RT | null>(null);
  const [floating, _setFloating] = useState<HTMLElement | null>(null);

  const setReference = useCallback((node: RT | null) => {
    if (referenceRef.current !== node) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);

  const setFloating = useCallback((node: HTMLElement | null) => {
    if (floatingRef.current !== node) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);

  const update = useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }

    const config: ComputePositionConfig = {
      placement,
      strategy,
      middleware: latestMiddleware,
    };

    if (platformRef.current) {
      config.platform = platformRef.current;
    }

    computePosition(referenceRef.current, floatingRef.current, config).then(
      (data) => {
        const fullData = { ...data, isPositioned: true };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          setData(fullData); // TODO: check flushSync
        }
      },
    );
  }, [latestMiddleware, placement, strategy, platformRef]);

  useLayoutEffect(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data) => ({ ...data, isPositioned: false }));
    }
  }, [open]);

  const isMountedRef = useRef(false);
  useLayoutEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (reference && floating) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(reference, floating, update);
      } else {
        update();
      }
    }
  }, [reference, floating, update, whileElementsMountedRef]);

  const refs = useMemo(
    () => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating,
    }),
    [setReference, setFloating],
  );

  const elements = useMemo(
    () => ({ reference, floating }),
    [reference, floating],
  );

  return useMemo(
    () => ({
      ...data,
      update,
      refs,
      elements,
      reference: setReference,
      floating: setFloating,
    }),
    [data, update, refs, elements, setReference, setFloating],
  );
}
