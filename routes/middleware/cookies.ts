import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "$std/http/cookie.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
export interface CookieContext {
  cookies: Record<string, string>;
  setCookie: (cookie: Cookie) => void;
  deleteCookie: (
    name: string,
    attributes?: { path?: string; domain?: string },
  ) => void;
}
export type WithCookie<Type> = CookieContext & Type;

/**
 * Might want to use signed cookies in the future
 */
export default async function CookiesMiddleware(
  req: Request,
  ctx: WithCookie<MiddlewareHandlerContext>,
) {
  const headers: Headers = new Headers();
  ctx.cookies = getCookies(req.headers);
  ctx.setCookie = (cookie) => setCookie(headers, cookie);
  ctx.deleteCookie = (name, attributes?) =>
    deleteCookie(headers, name, attributes);
  const res = await ctx.next();
  headers.forEach((value, name) => {
    res.headers.append(name, value);
  });
  return res;
}
