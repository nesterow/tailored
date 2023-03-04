import { Plugin } from "$fresh/server.ts";

export default function client(
  importURL: string,
): Plugin {
  const main = `data:application/javascript,
  import {init} from "${new URL(importURL, import.meta.url).href}";
  export default function(state) { init?.(state); }`;

  return {
    name: "client",
    entrypoints: { "main": main },
    render(ctx) {
      const res = ctx.render();
      const scripts = [];
      if (res.requiresHydration) {
        scripts.push({ entrypoint: "main", state: {} });
      }
      return {
        scripts,
      };
    },
  };
}
