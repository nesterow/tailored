// @deno-types="https://cdn.jsdelivr.net/npm/@types/marked@latest/index.d.ts"
import { marked } from "https://cdn.jsdelivr.net/npm/marked@latest/lib/marked.esm.js";
import { LRU } from "https://deno.land/x/lru@1.0.2/mod.ts";

const cache = new LRU<string>(32);

function sanitizePath(path: string) {
  return path.replace(/[^a-z0-9@]*/g, "");
}

export async function renderMdPage(path: string): Promise<string> {
  const file = "pages/" + sanitizePath(path) + ".md";
  let source = cache.get(file);
  if (!source) {
    source = await Deno.readTextFile(file);
    cache.set(file, source);
  }
  return marked.parse(source);
}
