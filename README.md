# Tailored

A set of utilities and components for [Fresh](https://fresh.deno.dev) and
[Preact](https://preactjs.com).

## Fresh plugins

### [Preact Context](https://deno.land/x/tailored/plugins/context.ts)

A plugin that enables the use of global Preact Context in islands. Current
verion supports only one provider and only JSON-serializable values.

> Usage

[context.ts](./context.ts)

```typescript
import Context from "./context.ts";
import contextPlugin from "tailored/plugins/context.ts";

await start(manifest as any, {
  plugins: [
    contextPlugin(
      Context,
      new URL("./context.ts", import.meta.url).href,
    ),
  ],
});
```

### [Twind v1 plugin](https://deno.land/x/tailored/plugins/twind.ts)

Twind v1 plugin for Fresh. Based on the official fresh plugin for twind v0.9

> Usage

[Plugin](./main.ts) | [Config](./twind.config.ts)

## Preact Hooks

The hooks are designed with the future perspective of being built within Web
components.

### [useContextFetch(Context)](https://deno.land/x/tailored/hooks/useContextFetch.ts)

Returns a `fetch` with headers set from the context.

```typescript
import Context from "@/tests/context.ts";
//...
const _fetch = useContextFetch(Context);
const response = await _fetch("/api/v1/test");
//..
```

### [useClickOutside(callback, refOrSelector, eventType="click")](https://deno.land/x/tailored/hooks/useClickOutside.ts)

Handle click outside of an element.

### [useCssPlayEnd(onFinish, ref, inputs=[])](https://deno.land/x/tailored/hooks/useCssPlayEnd.ts)

Handle the end of a CSS animation or/and transition. At the time doesn't handle
infinite animations.

### [useDebounceCallback(callback, delay, inputs=[])](https://deno.land/x/tailored/hooks/useDebounceCallback.ts)

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

### [useEventListener(eventName, handler, elementRef, options)](https://deno.land/x/tailored/hooks/useEventListener.ts)

Handles adding event listener to an element or a set of elements (elementRef).

### [usePosition(ref, options)](https://deno.land/x/tailored/hooks/usePosition.ts)

Calculate position of a floating element. Ported from @floating-ui/react-dom

> Options (@floating-ui/dom)

```typescript
{
  placement = "bottom",
  strategy = "absolute",
  middleware = [],
}
```

## Components

The unstyled Preact components. The components are designed with the future
perspective of being built as Web components.

### Popover

An unstyled popover built with
[Floating UI](https://floating-ui.com/docs/getting-started)

[source / typedefs](https://deno.land/x/tailored/components/Popover.tsx)

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

### ToggleClass

A component that toggles a class on a target element. The target element can be
a ref or a selector.

[source / typedefs](https://deno.land/x/tailored/components/ToggleClass.tsx)

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
