import { collect, generate } from "$fresh/src/dev/mod.ts";

const dirs = [
  "islands",
  "layouts",
  "pages",
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
