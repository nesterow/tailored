import { configSync } from "$std/dotenv/mod.ts";
configSync({ export: true, path: "./tests/.env.test" });

import { delay } from "https://deno.land/std@0.150.0/async/delay.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.174.0/testing/asserts.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { cleanup, setup } from "./fixtures/_load.ts";
import server from "./_server.ts";

const TEST_WITHOUT_BROWSER = !!Deno.env.get("TEST_WITHOUT_BROWSER");
const { test } = Deno;

test("tailored", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async (t) => {
  await setup();
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
    return;
  }

  const url = "http://localhost:3001";
  const _server = serve();
  while (await (await fetch(url)).ok === false) {
    await delay(100);
  }
  console.log("Test server started @", url);
  await t.step("fetch get /$test", async () => {
    const res = await fetch("http://localhost:3001/$test");
    const contents = await res.text();
    assert(contents.includes("<span>Hello world!</span>"));
    assertEquals(res.status, 200);
  });

  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
    ],
  });
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);
  page.on("pageerror", function (err) {
    console.log("Page error: ", err.toString());
  });
  page.on("console", (log) => {
    console.log(log.text());
  });

  await t.step("pupeteer get /$test", async () => {
    await page.goto("http://localhost:3001/$test", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("span");
  });

  await t.step("useFetch + SharedContext + island", async () => {
    await page.goto("http://localhost:3001/$usefetch", {
      waitUntil: "networkidle2",
    });

    await delay(5000);
    await page.waitForSelector("#test");
    const html = await page.$eval("html", (element) => {
      return element.innerHTML;
    });
    //assert(html.includes(`"lang":"cn"`));
    assert(html.includes(`"x":"1"`));
    assert(html.includes(`"x-test":"test"`));
  });

  await browser.close();
  await cleanup();
  Promise.resolve().then(() => Deno.exit(0));
});
