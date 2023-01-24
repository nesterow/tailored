import { createContext } from "preact";

interface RenderContext {
  lang: string;
  theme?: string;
  lc?: { [key: string]: { [key: string]: string } };
}

export const RenderContext = createContext<RenderContext>({
  lang: Deno.env.get("DEFAULT_LANGUAGE") || "en",
  theme: "light",
  lc: { en: {} },
});
