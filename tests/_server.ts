import { configSync } from "$std/dotenv/mod.ts";
configSync({ export: true, path: "./tests/.env.test" });

import { Manifest, ServerContext } from "$fresh/server.ts";
import { serve } from "$fresh/src/server/deps.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import { preflight } from "@/components/GlobalStyles.ts";
import twindConfig from "../twind.config.ts";

export default async () => {
  const _file = "../$fresh.gen.ts";
  const { default: manifest } = await import(_file); // pass by ref, otherwise won't work
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
    serve: () => serve(handler, { port: 3001 }),
  };
};
