import { RouteConfig } from "$fresh/server.ts";

const LANGS = typeof document === "undefined"
  ? (Deno.env.get("LANGUAGES") || "en").split(",")
  : ["en"];

export function getLanguage(url: URL): string {
  const lang = url.pathname.split(".").pop()?.replace(/\//g, "");
  return lang && LANGS.includes(lang) ? lang : LANGS[0];
}

export function i18nRouteConfig(
  filepath: URL = new URL(import.meta.url),
  opts?: RouteConfig,
): RouteConfig {
  const filename = filepath.toString().split("/").pop()?.replace(
    /\.[^/.]+$/,
    "",
  );
  const routeOverride = LANGS.reduce(
    (acc, val) => `${acc}{\.${val}}?`,
    `/${filename}`,
  );
  return {
    routeOverride,
    ...opts,
  };
}

export function i18nIndexConfig(
  opts?: RouteConfig,
): RouteConfig {
  const routeOverride = LANGS.reduce(
    (acc, val) => `${acc}{${val}}?`,
    "/",
  );
  return {
    routeOverride,
    ...opts,
  };
}
