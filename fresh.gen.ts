// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[...page].tsx";
import * as $1 from "./routes/_404.tsx";
import * as $2 from "./routes/_app.tsx";
import * as $3 from "./routes/_middleware.ts";
import * as $4 from "./routes/api/joke.ts";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/readme/[...page].tsx";
import * as $$0 from "./islands/HelixAnimation.tsx";
import * as $$1 from "./islands/HexoCube.tsx";
import * as $$2 from "./islands/LangSwitcher.tsx";
import * as $$3 from "./islands/MenuButton.tsx";
import * as $$4 from "./islands/MenuLink.tsx";
import * as $$5 from "./islands/StackIcons.tsx";

const manifest = {
  routes: {
    "./routes/[...page].tsx": $0,
    "./routes/_404.tsx": $1,
    "./routes/_app.tsx": $2,
    "./routes/_middleware.ts": $3,
    "./routes/api/joke.ts": $4,
    "./routes/index.tsx": $5,
    "./routes/readme/[...page].tsx": $6,
  },
  islands: {
    "./islands/HelixAnimation.tsx": $$0,
    "./islands/HexoCube.tsx": $$1,
    "./islands/LangSwitcher.tsx": $$2,
    "./islands/MenuButton.tsx": $$3,
    "./islands/MenuLink.tsx": $$4,
    "./islands/StackIcons.tsx": $$5,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
