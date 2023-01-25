import CookiesMiddleware from "./middleware/cookies.ts";
import RequestCounterMiddleware from "./middleware/requestCounter.ts";
import I18nMiddleware from "./middleware/i18n.ts";
import MarkdownMiddleware from "./middleware/markdown.ts";
export const handler = [
  CookiesMiddleware,
  I18nMiddleware,
  MarkdownMiddleware,
  RequestCounterMiddleware,
];
