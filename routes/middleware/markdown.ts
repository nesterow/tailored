import { MiddlewareHandlerContext } from "$fresh/server.ts";
import renderMd from "@/components/system/renderMd.ts";

/**
 * Depends on i18n.
 * Why we render markdown here? Because we want to use cache.
 */
export default async function MarkdownMiddleware(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const path = ctx.state.i18nPath as string || new URL(req.url).pathname;
  if (/\.|api\//g.test(path)) return ctx.next();
  try {
    const markdown = await renderMd(path);
    ctx.state.markdown = markdown;
  } catch (_e) {
    return ctx.next();
  }
  return ctx.next();
}
