#!/usr/bin/env -S deno run -A --watch=static/,routes/

import { watchMdx as mdx } from "https://deno.land/x/watch_mdx@v0.0.7/mod.ts";
import dev from "$fresh/dev.ts";

const precompile =
  Deno.args.findLast((arg) => arg === "--precompile") !== undefined;

// deno-lint-ignore no-explicit-any
const lock = precompile && (function (this: any) {
  this.release = new Promise((resolve) => {
    this.resolve = resolve;
  });
  return this;
}.bind({}))();

mdx({
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
  onCompile: lock ? lock.resolve : undefined,
});

if (precompile) {
  await lock.release;
  Deno.exit(0);
}

await dev(import.meta.url, "./main.ts");
