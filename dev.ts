#!/usr/bin/env -S deno run -A --watch=static/,routes/
/// <reference types="./typings/twind.d.ts" />

import {
  compileMdx as compile_mdx,
  watchMdx as watch_mdx,
} from "https://deno.land/x/watch_mdx@v0.0.8/mod.ts";
import dev from "$fresh/dev.ts";

const precompile =
  Deno.args.findLast((arg) => arg === "--precompile") !== undefined;

const watchMdxOptions: Parameters<typeof compile_mdx>[0] = {
  precompile,
  async compile({
    compile,
    source,
    output,
  }) {
    const result = await compile(
      source.value,
      {
        providerImportSource: null,
        jsxImportSource: "preact",
        jsx: true,
      },
    );
    const value = `
    // Output of \`watch_mdx\`. DO NOT EDIT.
    // This file is generated automatically.

    ${result.value}
    `;
    return {
      value,
      output,
    };
  },
};

if (precompile) {
  await compile_mdx(watchMdxOptions);
  Deno.exit(0);
}

watch_mdx(watchMdxOptions);
await dev(import.meta.url, "./main.ts");
