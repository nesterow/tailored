import { createContext } from "preact";

interface RenderContext {
  lang: string;
  lc?: Record<string, Record<string, string>>;
  headers?: Record<string, string>;
}

export const RenderContext = createContext<RenderContext>({
  lang: "en",
  lc: { en: {} },
  headers: {},
});
