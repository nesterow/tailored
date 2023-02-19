import { Plugin } from "$fresh/server.ts";
import { Context } from "preact";
import { setup, SHARED_CONTEXT_ID } from "./context/shared.ts";

export default function context(
  // deno-lint-ignore no-explicit-any
  Context: Context<any>,
  importURL: string,
): Plugin {
  setup(Context);

  console.log(importURL);
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
