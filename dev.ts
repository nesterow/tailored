#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import { watchMdx } from "https://deno.land/x/watch_mdx@v0.0.5/mod.ts";

const precompile =
  Deno.args.findLast((arg) => arg === "--precompile") !== undefined;

watchMdx({
  precompile,
  compile: async ({ compile, source, output }) => {
    const result = await compile(source.value, {
      providerImportSource: null,
      jsxImportSource: "preact",
      jsx: true,
    });
    return {
      value: result.value,
      output: output,
    };
  },
});

if (precompile) {
  Deno.exit(0);
}

await dev(import.meta.url, "./main.ts");
