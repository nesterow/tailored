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

import { Plugin } from "$fresh/server.ts";
import { Context } from "preact";
import { setup, SHARED_CONTEXT_ID } from "./context/shared.ts";

export default function context(
  // deno-lint-ignore no-explicit-any
  Context: Context<any>,
  importURL: string,
): Plugin {
  setup(Context);

  const main = `data:application/javascript,import hydrate from "${
    new URL("./context/hydrate.ts", import.meta.url).href
  }";
  import Context from "${new URL(importURL, import.meta.url).href}";
  export default function(state) { hydrate(Context, state); }`;

  return {
    name: "context",
    entrypoints: { "main": main },
    render(ctx) {
      const res = ctx.render();
      const scripts = [];
      if (res.requiresHydration) {
        scripts.push({ entrypoint: "main", state: { id: SHARED_CONTEXT_ID } });
      }
      return {
        scripts,
      };
    },
  };
}
