import { createContext } from "preact";
import type { I18nContext } from "tailored/hooks/useI18n.ts";
interface GlobalContext {
  headers?: Record<string, string>;
}

type Context = I18nContext & GlobalContext;

export default createContext<Context>({
  lang: "en",
  lc: { en: {} },
  headers: {},
});
