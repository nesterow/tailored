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
