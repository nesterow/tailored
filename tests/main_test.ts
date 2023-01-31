import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import server from "./_server.ts";

Deno.test("tailored", async (t) => {
  const { router } = await server();

  await t.step("GET /", async () => {
    const res = await router(new Request("http://localhost/"));
    assertEquals(res.status, 200);
    assertEquals(res.headers.get("content-type"), "text/html; charset=utf-8");
  });
});
