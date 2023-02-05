import { Handlers, PageProps } from "$fresh/server.ts";
import Page from "@/layouts/Page.tsx";
import Context from "tailored/context.ts";

/**
 * This is a handler for a route that renders a markdown page.
 */
export const handler: Handlers = {
  GET(_req, ctx) {
    if (ctx.state.markdown) {
      return ctx.render({
        source: ctx.state.markdown,
        lang: ctx.state.lang,
      });
    }
    return ctx.renderNotFound();
  },
};

export default function MarkedPage(props: PageProps) {
  return (
    <Context.Provider
      value={{
        lang: props.data.lang,
      }}
    >
      <Page>
        <section
          data-marked
          dangerouslySetInnerHTML={{ __html: props.data.source }}
        />
      </Page>
    </Context.Provider>
  );
}
