import { useEffect } from "preact/hooks";

type AnyThing = unknown | unknown[] | false | null;

export function useRecursiveEffect(
  effect: (args?: AnyThing) => AnyThing,
  cleanUp: (ctx: unknown[]) => void,
  inputs: unknown[] = [],
) {
  useEffect(() => {
    const ctx: unknown[] = [];
    let args = effect();
    while (args) {
      ctx.push(args);
      args = effect(args);
    }
    return () => cleanUp(ctx);
  }, inputs ?? []);
}
