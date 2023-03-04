import { Options, STYLE_ELEMENT_ID } from "./shared.ts";
import { cssom, setup, Sheet, SheetRule, stringify } from "twind/core";

type State = [string, string][];
hydrate.called = false;

export default function hydrate(options: Options, _state: State) {
  if (hydrate.called) {
    return;
  }
  hydrate.called = true;
  const el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  const sheet = cssom(el);
  sheet.resume = resume.bind(sheet);
  setup(options, sheet);
}

// https://github.com/tw-in-js/twind/blob/d1fe2ce028b904c3f871264db914ac778c059745/packages/core/src/sheets.ts#L206
function resume(
  this: Sheet,
  addClassName: (className: string) => void,
  insert: (cssText: string, rule: SheetRule) => void,
) {
  // hydration from SSR sheet
  const textContent = stringify(this.target);
  const RE = /\/\*!([\da-z]+),([\da-z]+)(?:,(.+?))?\*\//g;

  // only if this is a hydratable sheet
  if (RE.test(textContent)) {
    // RE has global flag — reset index to get the first match as well
    RE.lastIndex = 0;

    // 1. start with a fresh sheet
    this.clear();

    // 2. add all existing class attributes to the token/className cache
    if (typeof document != "undefined") {
      // deno-lint-ignore no-explicit-any
      for (const el of document.querySelectorAll("[class]") as any) {
        addClassName(el.getAttribute("class") as string);
      }
    }

    // 3. parse SSR styles
    let lastMatch: RegExpExecArray | null | undefined;

    while (
      (function commit(match?: RegExpExecArray | null) {
        if (lastMatch) {
          insert(
            // grep the cssText from the previous match end up to this match start
            textContent.slice(
              lastMatch.index + lastMatch[0].length,
              match?.index,
            ),
            {
              p: parseInt(lastMatch[1], 36),
              o: parseInt(lastMatch[2], 36) / 2,
              n: lastMatch[3],
            },
          );
        }

        return (lastMatch = match);
      })(RE.exec(textContent))
    ) {
      /* no-op */
    }
  }
}
