import { MiddlewareHandlerContext } from "$fresh/server.ts";
import rendermd from "../rendermd.ts";

const MARKDOWN_PAGES_DIR = Deno.env.get("MARKDOWN_PAGES_DIR") || "pages";

/**
 * Middleware for rendering markdown pages.
 * The directory is configurable via env variable `MARKDOWN_PAGES_DIR`,
 * the default value is `pages`.
 * If i18n is enbled the path will be resolved against the i18nPath.
 */
export default async function MarkdownMiddleware(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const { pathname } = new URL(req.url);
  if (/\.|api\/|_frsh\//g.test(pathname) || pathname === "/") {
    return ctx.next();
  }
  const path = MARKDOWN_PAGES_DIR +
    (ctx.state.i18nPath as string || pathname);
  try {
    const markdown = await rendermd(path);
    ctx.state.markdown = markdown;
  } catch (_e) {
    return ctx.next();
  }
  return ctx.next();
}
