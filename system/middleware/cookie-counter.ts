import { WithCookie } from "./cookies.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import logger from "../logger.ts";

const log = logger("RequestCounterMiddleware:");
const cookieName = "_unsigned_counter";
/**
 * Just for test and fun.
 * See the cookie middleware
 */
export default function RequestCounterMiddleware(
  _req: Request,
  ctx: WithCookie<MiddlewareHandlerContext>,
) {
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
  return ctx.next();
}
