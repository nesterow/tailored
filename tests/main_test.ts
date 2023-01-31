import { delay } from "https://deno.land/std@0.150.0/async/delay.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.174.0/testing/asserts.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import cleanup from "./fixtures/_load.ts";
import server from "./_server.ts";

const TEST_WITHOUT_BROWSER = !!Deno.env.get("TEST_WITHOUT_BROWSER");
const { test } = Deno;

test("tailored", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async (t) => {
  const { router, serve } = await server();

  await t.step("ctx get /", async () => {
    const res = await router(new Request("http://localhost/"));
    assertEquals(res.status, 200);
    assertEquals(res.headers.get("content-type"), "text/html; charset=utf-8");
  });

  await t.step("ctx get /$test", async () => {
    const res = await router(new Request("http://localhost/$test"));
    const contents = await res.text();
    assert(contents.includes("<span>Hello world!</span>"));
    assertEquals(res.status, 200);
    assertEquals(res.headers.get("content-type"), "text/html; charset=utf-8");
  });

  // below are pupeeteer tests
  if (TEST_WITHOUT_BROWSER) {
    cleanup();
    Deno.kill(Deno.pid);
    return;
  }

  const url = "http://localhost:3001";
  const _server = serve();
  while (await (await fetch(url)).ok === false) {
    await delay(100);
  }
  console.log("Test server started @", url);
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto("http://localhost:3001/$test", {
    waitUntil: "networkidle2",
  });

  await t.step("fetch get /$test", async () => {
    const res = await fetch("http://localhost:3001/$test");
    const contents = await res.text();
    assert(contents.includes("<span>Hello world!</span>"));
    assertEquals(res.status, 200);
  });

  await t.step("pupeteer get /$test", async () => {
    await page.waitForSelector("span");
  });

  // await t.step("TODO: test `useContext` within an island", async () => {
  // });

  await browser.close();
  cleanup();
  Deno.kill(Deno.pid);
});
