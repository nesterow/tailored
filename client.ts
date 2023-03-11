/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/**
 * Client only code: prefetch, service worker, etc.
 */
import { listen } from "quicklink";

function prefetchLinks() {
  setTimeout(() => {
    const anchorParents: NodeListOf<HTMLElement> = document.querySelectorAll(
      "[data-prefetch]",
    );
    anchorParents.forEach((el) =>
      listen({
        limit: 10,
        el,
        delay: 2000,
        ignores: [
          (uri) => {
            return uri.includes("#") || uri === location.toString();
          },
        ],
      })
    );
  }, 5000);
}

export function init() {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    prefetchLinks();
  } else {
    document.addEventListener("DOMContentLoaded", prefetchLinks, {
      once: true,
    });
  }
}
