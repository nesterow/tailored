import { createContext } from "preact";

interface DefaultContext {
  lang: string;
  lc?: Record<string, Record<string, string>>;
  headers?: Record<string, string>;
}

/**
 * Inteface to augment default context.
 */
export interface Context extends DefaultContext {
  lang: string;
}

/**
 * Default context:
 *  - lang: "en" (default language)
 *  - lc: { en: {} } (language dictionary)
 *  - headers: {} (headers to be sent with fetch)
 *
 * Augmet it trough `Context` interface.
 */
export default createContext<DefaultContext | Context>({
  lang: "en",
  lc: { en: {} },
  headers: {},
});
