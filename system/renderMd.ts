if (typeof document !== "undefined") {
  throw new Error("`renderMd` should be imported only on server side.");
}

import { marked } from "./deps.ts";
import { LRU } from "https://deno.land/x/lru@1.0.2/mod.ts";
import logger from "./logger.ts";

const MARKDOWN_RENDER_CACHE_SIZE = Number(
  Deno.env.get("MARKDOWN_RENDER_CACHE_SIZE") || 32,
);
const MARKDOWN_RENDER_CACHE_DISABLED =
  Deno.env.get("MARKDOWN_RENDER_CACHE_DISABLED") ||
  Deno.env.get("DENO_ENV") === "development";
const log = logger("renderMd");
const cache = new LRU<string>(MARKDOWN_RENDER_CACHE_SIZE);

/**
 * Sanitize path. Remove all unwanted characters.
 * Allowed characters: a-z, 0-9, @, /, -
 * @param {string} path
 * @returns {string}
 */
function sanitizePath(path: string) {
  return path.replace(/[^a-z0-9@\/\-]*/g, "");
}

/**
 * Render markdown page and put it in cache.
 * By default, cache is disabled in development mode.
 * Cache settings can be changed by setting environment variables:
 * - MARKDOWN_RENDER_CACHE_DISABLED (true/undefined, default: undefined)
 * - MARKDOWN_RENDER_CACHE_SIZE (number, default: 32)
 *
 * @param {string} path - File path without extension.
 */
export default async function renderMdPage(path: string): Promise<string> {
  const file = sanitizePath(path) + ".md";
  if (MARKDOWN_RENDER_CACHE_DISABLED) {
    log.dev(file);
    return marked.parse(await Deno.readTextFile(file));
  }
  let render = cache.get(file);
  if (!render) {
    render = marked.parse(await Deno.readTextFile(file));
    cache.set(file, render);
  }
  return render;
}
