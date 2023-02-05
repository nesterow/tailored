import { MiddlewareHandlerContext } from "$fresh/server.ts";
import renderMd from "../renderMd.ts";

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
  const path = MARKDOWN_PAGES_DIR +
    (ctx.state.i18nPath as string || new URL(req.url).pathname);
  if (/\.|api\//g.test(path)) return ctx.next();
  try {
    const markdown = await renderMd(path);
    ctx.state.markdown = markdown;
  } catch (_e) {
    return ctx.next();
  }
  return ctx.next();
}
