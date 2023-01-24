import I18nMiddleware from "./middleware/i18n.ts";
import MarkdownMiddleware from "./middleware/markdown.ts";
export const handler = [
  I18nMiddleware,
  MarkdownMiddleware,
];
