import { createContext } from "preact";

interface DefaultContext {
  lang: string;
  lc?: Record<string, Record<string, string>>;
  headers?: Record<string, string>;
}

// deno-lint-ignore no-empty-interface
export interface Context extends DefaultContext {}

/** */
export default createContext<DefaultContext | Context>({
  lang: "en",
  lc: { en: {} },
  headers: {},
});
