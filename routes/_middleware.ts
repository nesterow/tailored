import CookiesMiddleware from "tailored/middleware/cookies.ts";
import I18nMiddleware from "tailored/middleware/i18n.ts";
import MarkdownMiddleware from "tailored/middleware/markdown.ts";
export const handler = [
  CookiesMiddleware,
  I18nMiddleware,
  MarkdownMiddleware,
];
