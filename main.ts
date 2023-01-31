/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import "$std/dotenv/load.ts";
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { preflight } from "@/components/GlobalStyles.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

// deno-lint-ignore no-explicit-any
await start(manifest as any, {
  plugins: [
    twindPlugin({
      selfURL: new URL("./twind.config.ts", import.meta.url).href,
      ...twindConfig,
      preflight,
    }),
  ],
});
