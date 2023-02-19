import { createContext } from "preact";

interface GlobalContext {
  lang: string;
  lc?: Record<string, Record<string, string>>;
  headers?: Record<string, string>;
}

export default createContext<GlobalContext>({
  lang: "en",
  lc: { en: {} },
  headers: {},
});
