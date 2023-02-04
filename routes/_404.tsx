import Page from "@/layouts/Page.tsx";
import { RenderContext } from "tailored/context.ts";
import { PageProps } from "$fresh/server.ts";

export default function NotFoundPage(props: PageProps) {
  return (
    <RenderContext.Provider
      value={{
        lang: props.url.pathname.split("/")[1],
      }}
    >
      <Page>
        <h1>404</h1>
        <p>Page not found</p>
      </Page>
    </RenderContext.Provider>
  );
}
