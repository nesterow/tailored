import { WithCookie } from "./cookies.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

const cookieName = "_unsigned_counter";
/**
 * Just for test and fun.
 */
export default async function RequestCounterMiddleware(
  req: Request,
  ctx: WithCookie<MiddlewareHandlerContext>,
) {
  if (!/[_\.]/gi.test(req.url)) {
    ctx.setCookie({
      name: cookieName,
      value: String(Number(ctx.cookies[cookieName] || 0) + 1),
      expires: new Date(Date.now() + 360000),
      secure: true,
      path: "/",
      httpOnly: true,
    });
  }
  return ctx.next();
}
