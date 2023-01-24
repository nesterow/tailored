import { Handlers, PageProps } from "$fresh/server.ts";
import Page from "../layouts/Page.tsx";
import { renderMdPage } from "../system/page.ts";

/**
 * This is a handler for a route that renders a markdown page.
 */
export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const source = await renderMdPage(ctx.params.page);
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
      <section
        data-marked
        dangerouslySetInnerHTML={{ __html: props.data.source }}
      />
    </Page>
  );
}
