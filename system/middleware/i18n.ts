import { MiddlewareHandlerContext } from "$fresh/server.ts";

const LANGUAGES = Deno.env.get("LANGUAGES")?.split(",") || ["en"];
const DEFAULT_LANGUAGE = Deno.env.get("DEFAULT_LANGUAGE") || LANGUAGES[0];

/**
 * Naive i18n middleware.
 * Set the language based on the path.
 */
export default function I18nMiddleware(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const path = new URL(req.url).pathname;
  const lang = path.split(".").pop() ?? DEFAULT_LANGUAGE;
  if (LANGUAGES.includes(lang)) {
    ctx.state.lang = lang;
    ctx.state.i18nPath = path;
  } else {
    ctx.state.lang = DEFAULT_LANGUAGE;
    ctx.state.i18nPath = `/${path}.${DEFAULT_LANGUAGE}`;
  }
  return ctx.next();
}
