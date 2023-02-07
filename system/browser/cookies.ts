import { getCookies as _getCookies } from "$std/http/cookie.ts";

export function getCookies() {
  const headers = new Headers({
    "Cookie": document.cookie,
  });
  return _getCookies(headers);
}

export function getCookieValue(name: string): string | undefined {
  const cookies = getCookies();
  return cookies[name];
}
