import { useLayoutEffect, useRef } from "preact/hooks";
/**
 * @hydrated
 *
 * Get a ref to an element by dom selector. Uses a MutationObserver to update the ref. Be careful.
 *
 * Useful when you need to work with native DOM APIs, for example, when some part of the DOM is rendered
 * by server-side code (i.e. when the app layout is rendered by the server).
 * Common use cases: click outside, layout styles, dataset attributes, web components, etc.;
 *
 * You should avoid using this kind of approach if the rendered dom is outside of component subtree.
 *
 * GOOD (hydrated component applying effects to dom rendered by server inside component):
 *
 *    <MyServerLayout>
 *     <MyServerHeader>
 *       <MyHydratedMenuToggle selector="#my-menu"/>
 *       <menu-web-component id="my-menu" hidden>
 *         no hydrated menu rendered by server
 *       </menu-web-component>
 *     </MyServerHeader>
 *    <MyServerLayout>
 *
 * BAD (hydrated component applying effects to arbitrary dom selector):
 *
 *    <MyServerLayout>
 *     <MyServerHeader>
 *      <MyHydratedMenuToggle selector="#who-knows-where"/>
 *     </MyServerHeader>
 *    </MyServerLayout>
 */
export function useDomSelectorRef<T>(selector: string, inputs?: unknown[]) {
  if (typeof document === "undefined") return useRef(null);

  const ref = useRef<HTMLElement | Element | null>(null);
  const setRef = () => {
    ref.current = document.querySelector(selector);
  };
  const noop = "noop";
  useLayoutEffect(() => {
    setRef();
    const observer = new MutationObserver(setRef);
    observer.observe(ref.current!, {
      subtree: false,
      attributes: true,
      attributeOldValue: true,
      attributeFilter: [
        "id",
        "class",
        selector.includes("[") // [a="b"]
          ? selector.replace(/(\[|\])/g, "").split("=").shift() || noop
          : noop,
      ],
    });
    return () => {
      observer.disconnect();
    };
  }, inputs ?? [selector]);

  return ref;
}