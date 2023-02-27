// deno-lint-ignore-file no-explicit-any

import { options, VNode } from "preact";

declare module "preact" {
  interface Options extends Record<string, (v: VNode) => void> {
    "_render"?: (vnode: VNode) => void;
    "__r"?: (vnode: VNode) => void;
  }

  interface VNode extends Record<string, any> {
    "__ctx"?: Record<string, any>;
    "__c"?: Record<string, any>;
    "_component"?: Record<string, any>;
  }
}

// Using some privates here, which might be shorted
// See preact's `mangle.json`
const ugly = {
  _render: "__r",
  _component: "__c",
  _id: "__c",
};

const is_ugly = !options._render;
const _id = is_ugly ? ugly["_id"] : "_id";
const _render = is_ugly ? ugly["_render"] : "_render";
const _component = is_ugly ? ugly["_component"] : "_component";

/**
 * @param Context
 * @param state
 */
export default function hydrate(Context: any, state: { id: string }) {
  const valid = document.querySelectorAll("#" + state.id).length <= 1;
  if (!valid) {
    throw new Error(
      "Global context:\n Context.Provider must be used once during render." +
        "The application must use only one global context",
    );
  }

  const el = document.getElementById(state.id);
  const value = JSON.parse(
    el?.innerHTML || "{}",
  );

  const provider = new Context.Provider({ value });
  provider.props = { value };

  const hook = options.vnode;
  options.vnode = (vnode: VNode) => {
    if (typeof vnode.type === "function") {
      vnode.__ctx = {
        [Context[_id]]: provider,
      };
    }
    hook?.(vnode);
  };

  const render = options[_render];
  options[_render] = (vnode) => {
    if (
      vnode[_component] &&
      vnode.__ctx
    ) {
      vnode[_component].context = {
        ...vnode[_component].context,
        ...vnode.__ctx,
      };
    }
    render?.(vnode);
  };

  setTimeout(() => {
    el?.remove();
  }, 0);
}
