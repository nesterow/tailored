import { WithCookie } from "./cookies.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import logger from "@/components/system/logger.ts";

const log = logger("RequestCounterMiddleware:");
const cookieName = "_unsigned_counter";
/**
 * Just for test and fun.
 */
export default function RequestCounterMiddleware(
  req: Request,
  ctx: WithCookie<MiddlewareHandlerContext>,
) {
  if (!/[_\.]/gi.test(req.url)) {
    const count = Number(ctx.cookies[cookieName] || 0);
    log.info("Test request count was", count);
    ctx.setCookie({
      name: cookieName,
      value: String(count + 1),
      expires: new Date(Date.now() + 360000),
      secure: true,
      path: "/",
      httpOnly: true,
    });
    log.warn("Test request count is", count + 1);
  }
  return ctx.next();
}
