// deno-lint-ignore-file no-explicit-any
/**
MIT License

Copyright (c) 2023 Anton Nesterov, anton@demiurg.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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

let contextId = "cC0";
let provider: any = null;
let value = null;

const hook = options.vnode;
options.vnode = (vnode: VNode) => {
  if (typeof vnode.type === "function") {
    vnode.__ctx = {
      [contextId]: provider,
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

  contextId = Context[_id];
  value = JSON.parse(
    el?.innerHTML || "{}",
  );
  provider = new Context.Provider({ value });
  provider.props = { value };

  setTimeout(() => {
    el?.remove();
  }, 0);
}
