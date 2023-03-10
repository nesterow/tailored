/**
 * Client only code
 */
import { listen } from "quicklink";

export function init() {
  document.addEventListener("DOMContentLoaded", () => {
    const anchors: NodeListOf<HTMLElement> = document.querySelectorAll(
      "[data-prefetch]",
    );
    anchors.forEach((el) =>
      listen({
        limit: 10,
        el,
        ignores: [
          (uri) => {
            return uri.includes("#") || uri === location.toString();
          },
        ],
      })
    );
  }, { once: true });
}
