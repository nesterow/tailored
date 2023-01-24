import { MiddlewareHandlerContext } from "$fresh/server.ts";

const LANGUAGES = Deno.env.get("LANGUAGES")?.split(",") || ["en"];
const DEFAULT_LANGUAGE = Deno.env.get("DEFAULT_LANGUAGE") || LANGUAGES[0];

/**
 * Naive i18n middleware.
 * Since we don't have sessions yet we just set the language based on the path.
 */
export default function I18nMiddleware(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const path = new URL(req.url).pathname;
  const lang = path.split("/")[1];
  if (LANGUAGES.includes(lang)) {
    ctx.state.lang = lang;
    ctx.state.i18nPath = path;
  } else {
    ctx.state.lang = DEFAULT_LANGUAGE;
    ctx.state.i18nPath = "/" + DEFAULT_LANGUAGE + path;
  }
  return ctx.next();
}
