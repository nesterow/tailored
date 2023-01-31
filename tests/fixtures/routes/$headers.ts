import { HandlerContext } from "$fresh/server.ts";

export const handler = (req: Request, _ctx: HandlerContext): Response => {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return new Response(JSON.stringify(headers, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
};
