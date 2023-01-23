import { PageProps, Handlers } from "$fresh/server.ts";
import Marked from "../components/Marked.tsx";
import Page from "../layouts/Page.tsx";

function sanitizePath(path: string) {
  return path.replace(/[^a-z0-9@]*/g, '');
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const path = 'pages/' + sanitizePath(ctx.params.page) + ".md";
    try {
      return ctx.render({ 
        path: await Deno.realPath(path)
      })
    } catch (e) {
      return ctx.renderNotFound()
    }
  },
};

export default function MarkedPage(props: PageProps) {

  return (
    <Page>
      <Marked path={props.data.path}/>
    </Page>
  )
}
