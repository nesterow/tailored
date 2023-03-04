# Tailored

![test](https://github.com/nesterow/tailored/actions/workflows/test.yml/badge.svg?branch=main)

_Isomorphic utilities, components and hooks for [Fresh](https://fresh.deno.dev)
and [Preact](https://preactjs.com)._

---

## Preact Hooks

_A set of useful hooks for preact._

- [useContextFetch(ctx)](https://deno.land/x/tailored/hooks/useContextFetch.ts?source)
  > Retutns fetch function with set headers from context: `{headers: {}}`
- [useClickOutside(callback, refOrSelector, eventType="click")](https://deno.land/x/tailored/hooks/useClickOutside.ts?source)
  > Handle click outside of an element set by ref or selector.
- [useCssPlayEnd(onFinish, ref, inputs=[])](https://deno.land/x/tailored/hooks/useCssPlayEnd.ts?source)
  > Handle the end of a CSS animation or/and transition. At the time doesn't
  > handle infinite animations.
- [useDebounceCallback(callback, delay, inputs=[])](https://deno.land/x/tailored/hooks/useDebounceCallback.ts?source)
  > Returns an object with a debounced version of the `callback`, `immediate`
  > and `cancel`.
- [useEventListener(eventName, handler, elementRef, options)](https://deno.land/x/tailored/hooks/useEventListener.ts?source)
  > Handles adding event listener to an element or a set of elements
  > (elementRef).
- [usePosition(ref, options)](https://deno.land/x/tailored/hooks/usePosition.ts?source)
  > Calculate position of a floating element. Ported from @floating-ui/react-dom
- [useI18n(ctx)](https://deno.land/x/tailored/hooks/useI18n.ts?source)
  > Use translations set from context: `{lc: {en: {}}, lang: "en"}`

---

## Components

_The unstyled Preact components._

### Popover

Completely unstyled popover for preact built with
[Floating UI](https://floating-ui.com/docs/getting-started)

```typescript
import { useRef } from "preact/hooks";
import Popover from "https://deno.land/x/tailored/components/Popover.tsx";

export default function App() {
  const ref = useRef(null);
  return (
    <div>
      <button ref={ref}>Open popover</button>
      <Popover
        target={ref}
        trigger="click"
        className="bg-white shadow-lg rounded-lg p-4"
        clickOutside
      >
        <div>Content</div>
      </Popover>
    </div>
  );
}
```

[source / typedefs](https://deno.land/x/tailored/components/Popover.tsx?source)

### ToggleClass

A component that toggles a class on a target element. The target element can be
a ref or a selector.

```typescript
import { tw } from "twind/core";
import ToggleClass from "https://deno.land/x/tailored/components/ToggleClass.tsx";

export default function MenuButton(props: MenuButtonProps) {
  return (
    <ToggleClass
      target="[mobile-menu]"
      toggleAddClass={tw("flex")}
      toggleRemoveClass={tw("visibility-hidden")}
    >
      <MenuIcon />
    </ToggleClass>
  );
}
```

[source / typedefs](https://deno.land/x/tailored/components/ToggleClass.tsx?source)

---

## Fresh plugins

_Useful plugins for Fresh._

### Context plugin

A plugin that enables the use of global Preact Context in islands. Current
verion supports only one provider and only JSON-serializable values.

```typescript
import Context from "./context.ts";
import contextPlugin from "tailored/plugins/context.ts";

await start(manifest, {
  plugins: [
    contextPlugin(
      Context,
      new URL("./context.ts", import.meta.url).href,
    ),
  ],
});
```

[context.ts](./context.ts) |
[source](https://deno.land/x/tailored/plugins/context.ts?source)

### Client plugin

Used for client-only code:

```typescript
import clientPlugin from "tailored/plugins/client.ts";

await start(manifest, {
  plugins: [
    clientPlugin(
      new URL("./client.ts", import.meta.url).href,
    ),
  ],
});
```

[client.ts](./client.ts) |
[source](https://deno.land/x/tailored/plugins/client.ts?source)

### Preloader plugin

Show a progress indicator while the page is loading:

```typescript
import preloaderPlugin from "tailored/plugins/preloader.ts";

await start(manifest, {
  plugins: [
    preloaderPlugin({
      color: "#48d1cc",
    }),
  ],
});
```

### Twind v1 plugin

Twind v1 plugin for Fresh. Based on the official fresh plugin for twind v0.9

[Plugin](./main.ts) | [Config](./twind.config.ts) |
[source](https://deno.land/x/tailored/plugins/twind.ts?source)

---

## Development

Start the project:

```bash
deno task dev
```

This will watch the project directory and restart as necessary.

## Testing

```bash
PUPPETEER_PRODUCT=chrome deno run -A --unstable https://deno.land/x/puppeteer@16.2.0/install.ts
deno task test
```

## License

MIT
