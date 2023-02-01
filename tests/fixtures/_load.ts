/**
 * At the time this works as follows:
 *   - the mocks are copied to the project directory
 *   - after the tests are run, the mocks are removed
 *
 *   TODO:
 *   The downside is that the mocks are not removed from project if the tests fail.
 *   Not a big deal, but it would be nice to have a better solution, so in the
 *   future it should be done vice versa:
 *      - copy project to a cache directory
 *      - copy mocks
 *      - clean cache directory
 */

import { collect, generate } from "$fresh/src/dev/mod.ts";

const dirs = [
  "islands",
  "layouts",
  "routes",
];
cleanup();

dirs.forEach((name) => {
  const contents = Deno.readDirSync(`./tests/fixtures/${name}`);
  for (const content of contents) {
    if (!content.name.startsWith("$")) {
      throw new Error(`Test content must start with $: ${content.name}`);
    }
    console.log(content.name);
    Deno.linkSync(
      `./tests/fixtures/${name}/${content.name}`,
      `./${name}/${content.name}`,
    );
  }
});

const path = import.meta.url.replace("file://", "").replace(
  "/tests/fixtures/_load.ts",
  "",
);
const manifest = await collect(path);
await generate("./tests/fixtures", manifest);
Deno.linkSync(
  `./tests/fixtures/fresh.gen.ts`,
  `./$fresh.gen.ts`,
);

export default function cleanup() {
  try {
    dirs.forEach((name) => {
      const contents = Deno.readDirSync(`./${name}`);
      for (const content of contents) {
        if (content.name.startsWith("$")) {
          Deno.removeSync(`./${name}/${content.name}`);
        }
      }
    });
    Deno.removeSync(`./tests/fixtures/fresh.gen.ts`);
    Deno.removeSync(`./$fresh.gen.ts`);
  } catch (_e) {
    // ignore
  }
}
