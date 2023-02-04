import { marked } from "./deps.ts";
import { LRU } from "https://deno.land/x/lru@1.0.2/mod.ts";
import logger from "./logger.ts";

const log = logger("renderMd");
const isDev = Deno.env.get("DENO_ENV") === "development";
const cache = new LRU<string>(32);

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
 * The cache is active only in production mode.
 * @param {string} path - File path without extension.
 */
export default async function renderMdPage(path: string): Promise<string> {
  const file = "pages" + sanitizePath(path) + ".md";
  let source = isDev ? null : cache.get(file);
  if (!source) {
    source = await Deno.readTextFile(file);
    if (!isDev) {
      cache.set(file, source);
    }
  }
  log.dev(file);
  return marked.parse(source);
}
