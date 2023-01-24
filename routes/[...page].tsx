import { Handlers, PageProps } from "$fresh/server.ts";
import Page from "@/layouts/Page.tsx";

/**
 * This is a handler for a route that renders a markdown page.
 */
export const handler: Handlers = {
  GET(_req, ctx) {
    if (ctx.state.markdown) {
      return ctx.render({
        source: ctx.state.markdown,
      });
    }
    return ctx.renderNotFound();
  },
};

export default function MarkedPage(props: PageProps) {
  return (
    <Page>
      <section
        data-marked
        dangerouslySetInnerHTML={{ __html: props.data.source }}
      />
    </Page>
  );
}
