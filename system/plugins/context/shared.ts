import { ComponentChildren, createContext, h, options, VNode } from "preact";

interface ProviderProps {
  value: unknown;
  children: ComponentChildren;
}

export const SHARED_CONTEXT_ID = "__CONTEXT";

export function setup(Context: ReturnType<typeof createContext>) {
  const originalHook = options.vnode;
  options.vnode = (vnode: VNode) => {
    if (vnode.type === Context.Provider) {
      vnode.props.children = [
        vnode.props.children,
        h("script", {
          type: "application/json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify((vnode.props as ProviderProps).value),
          },
          id: SHARED_CONTEXT_ID,
        }),
      ];
    }
    originalHook?.(vnode);
  };
}
