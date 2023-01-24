import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { RenderContext } from "@/components/system/context.ts";
import Landing from "@/pages/Landing.tsx";

const langIndexPattern = (Deno.env.get("LANGUAGES") || "en").split(",").reduce(
  (acc, val) => `${acc}{${val}}?`,
  "/",
);
export const config: RouteConfig = {
  routeOverride: langIndexPattern,
};
export const handler: Handlers = {
  GET(req, ctx) {
    return ctx.render({
      lang: ctx.state.lang,
    });
  },
};

export default function Index({ data }: PageProps) {
  return (
    <RenderContext.Provider
      value={{
        theme: "light",
        lang: data.lang,
      }}
    >
      <Head>
        <title>nesterov.digital</title>
      </Head>
      <Landing />
    </RenderContext.Provider>
  );
}
