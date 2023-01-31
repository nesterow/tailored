import { configSync } from "$std/dotenv/mod.ts";
configSync({ export: true, path: "./tests/.env.test" });

import { Manifest, ServerContext } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import { preflight } from "@/components/GlobalStyles.ts";
import twindConfig from "../twind.config.ts";
import manifest from "../fresh.gen.ts";

export default async () => {
  const ctx = await ServerContext.fromManifest(
    manifest as unknown as Manifest,
    {
      plugins: [
        twindPlugin({
          selfURL: new URL("./twind.config.ts", import.meta.url).href,
          ...twindConfig,
          preflight,
        }),
      ],
    },
  );

  const handler = ctx.handler();

  const router = (req: Request) => {
    return handler(req, {
      localAddr: {
        transport: "tcp",
        hostname: "127.0.0.1",
        port: 80,
      },
      remoteAddr: {
        transport: "tcp",
        hostname: "127.0.0.1",
        port: 80,
      },
    });
  };
  return {
    ctx,
    router,
    handler,
  };
};
