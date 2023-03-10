/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import "$std/dotenv/load.ts";
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import clientPlugin from "tailored/plugins/client.ts";
import twindPlugin from "tailored/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import preloaderPlugin from "tailored/plugins/preloader.ts";
import contextPlugin from "tailored/plugins/context.ts";
import Context from "./context.ts";

// deno-lint-ignore no-explicit-any
await start(manifest as any, {
  plugins: [
    preloaderPlugin(
      "linear-gradient(to right, #f65599 0%, #fd5599 51%, #f65599 100%)",
      "4px",
    ),
    clientPlugin(
      new URL("./client.ts", import.meta.url).href,
    ),
    contextPlugin(
      Context,
      new URL("./context.ts", import.meta.url).href,
    ),
    twindPlugin({
      selfURL: new URL("./twind.config.ts", import.meta.url).href,
      ...twindConfig,
    }),
  ],
});
