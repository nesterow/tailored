# Tailored

Isomorphic utilities, components and hooks for [Fresh](https://fresh.deno.dev)
and [Preact](https://preactjs.com).

---

## Fresh plugins

Useful plugins for Fresh.

### 1. Context plugin

A plugin that enables the use of global Preact Context in islands. Current
verion supports only one provider and only JSON-serializable values.

> Usage

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

### 2. Twind v1 plugin

Twind v1 plugin for Fresh. Based on the official fresh plugin for twind v0.9

> Usage

[Plugin](./main.ts) | [Config](./twind.config.ts) |
[source](https://deno.land/x/tailored/plugins/twind.ts?source)

### 3. Preloader plugin

Show a progress indicator while the page is loading.

> Usage

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

---

## Preact Hooks

A set of useful hooks for preact. The hooks are designed with the future
perspective of being built within Web components.

### _useContextFetch(Context)_

Returns a `fetch` with headers set from the context.

```typescript
import Context from "@/tests/context.ts";
//...
const _fetch = useContextFetch(Context);
const response = await _fetch("/api/v1/test");
//..
```

[source](https://deno.land/x/tailored/hooks/useContextFetch.ts?source)

### _useClickOutside(callback, refOrSelector, eventType="click")_

Handle click outside of an element.

[source](https://deno.land/x/tailored/hooks/useClickOutside.ts?source)

### _useCssPlayEnd(onFinish, ref, inputs=[])_

Handle the end of a CSS animation or/and transition. At the time doesn't handle
infinite animations.

[source](https://deno.land/x/tailored/hooks/useCssPlayEnd.ts?source)

### _useDebounceCallback(callback, delay, inputs=[])_

Returns an object with a debounced version of the `callback`, `immediate` and
`cancel`.

> Usage

```typescript
const method = useDebounceCallback(() => {
  somethingNeedsDebounce();
}, 300);

onClickOutside(method.immediate, ref);

return (
  <div ref={ref}>
    <button onClick={method.callback}>
      Press me no more than once every 300ms
    </button>
  </div>
);
```

[source](https://deno.land/x/tailored/hooks/useDebounceCallback.ts?source)

### _useEventListener(eventName, handler, elementRef, options)_

Handles adding event listener to an element or a set of elements (elementRef).

[source](https://deno.land/x/tailored/hooks/useEventListener.ts?source)

### _usePosition(ref, options)_

Calculate position of a floating element. Ported from @floating-ui/react-dom

> Options (@floating-ui/dom)

```typescript
{
  placement = "bottom",
  strategy = "absolute",
  middleware = [],
}
```

[source](https://deno.land/x/tailored/hooks/usePosition.ts?source)

---

## Components

The unstyled Preact components. The components are designed with the future
perspective of being built as Web components.

### Popover

An unstyled popover built with
[Floating UI](https://floating-ui.com/docs/getting-started)

> Usage

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

> Usage

```typescript
import { tw } from "twind";
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
