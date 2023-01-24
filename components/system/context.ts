import { createContext } from "preact";

export const RenderContext = createContext({
  lang: Deno.env.get("DEFAULT_LANGUAGE") || "en",
  theme: "light",
});
