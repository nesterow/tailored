// deno-lint-ignore-file no-explicit-any

import { options, VNode } from "preact";

declare module "preact" {
  interface Options {
    _render?: (vnode: VNode) => void;
    __r?: (vnode: VNode) => void;
  }

  interface VNode {
    __ctx?: Record<string, any>;
    __c?: Record<string, any>;
    _component?: Record<string, any>;
  }
}

export default function hydrate(Context: any, state: { id: string }) {
  const el = document.getElementById(state.id);
  const value = JSON.parse(
    el?.innerHTML || "{}",
  );
  const provider = new Context.Provider({ value });
  provider.props = { value };

  const _vnode = options.vnode;
  options.vnode = (vnode: VNode) => {
    if (typeof vnode.type === "function") {
      vnode.__ctx = {
        [Context.__c]: provider,
      };
    }
    _vnode?.(vnode);
  };

  const _hook_name = options._render ? "_render" : "__r"; // if mangled
  const _render = options[_hook_name];
  const _component = _hook_name === "_render" ? "_component" : "__c";

  options[_hook_name] = (vnode) => {
    if (vnode[_component] && vnode.__ctx) {
      vnode[_component]!.context = {
        ...vnode[_component]!.context,
        ...vnode.__ctx,
      };
    }
    _render?.(vnode);
  };

  setTimeout(() => {
    el?.remove();
  }, 0);
}
