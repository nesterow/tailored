import { Handlers, PageProps } from "$fresh/server.ts";
import Marked from "../components/Marked.tsx";
import Page from "../layouts/Page.tsx";

function sanitizePath(path: string) {
  return path.replace(/[^a-z0-9@]*/g, "");
}

/**
 * TODO: May want to cache it somehow in order to avoid reading the file on every request
 */
export const handler: Handlers = {
  async GET(req, ctx) {
    const path = "pages/" + sanitizePath(ctx.params.page) + ".md";
    try {
      const source = await Deno.readTextFile(path);
      return ctx.render({
        source,
      });
    } catch (e) {
      return ctx.renderNotFound();
    }
  },
};

export default function MarkedPage(props: PageProps) {
  return (
    <Page>
      <Marked source={props.data.source} />
    </Page>
  );
}
