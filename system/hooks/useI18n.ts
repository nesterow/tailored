/**
MIT License

Copyright (c) 2023 Anton Nesterov, anton@demiurg.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Context, Fragment, h, JSX, VNode } from "preact";
import { useContext, useDebugValue } from "preact/hooks";

declare module "preact" {
  namespace JSX {
    interface IntrinsicAttributes {
      lang?: string;
    }
  }
}

interface I18nProps {
  children: JSX.Element[];
}

export interface LcMessageProps extends JSX.IntrinsicAttributes {
  children: string | { [key: string]: string };
}

export interface I18nContext {
  lang: string;
  lc: { [key: string]: { [key: string]: string } };
}

export interface I18nSetup {
  pattern: RegExp;
  escapePattern: RegExp;
  // deno-lint-ignore no-explicit-any
  format: Record<string, (value: any, ctx?: any) => string>;
  debug?: boolean;
  defaultLang?: string;
  // deno-lint-ignore no-explicit-any
  onMissing?: (key: string, ctx: any) => string;
  cache?: Map<string, string>;
  cacheSize?: number;
}

const settings: I18nSetup = {
  pattern: /(?<!%)%([a-z0-9\:]+)/g, // %key, %key:format, != %%key
  escapePattern: /%%([a-z0-9\:]+)/g, // %%key -> %key
  debug: false,
  format: {
    upper: (value) => value.toString().toUpperCase(),
    lower: (value) => value.toString().toLowerCase(),
  },
};

/**
 * Sets up translations, should be called once before app initialization.
 *
 * - defaultLang: default language
 * - format: custom formatters
 * - onMissing: custom missing key handler
 *
 * @param {{
 *  defaultLang?: string,
 *  format?: Record<string, (value: any, ctx: Context) => string>,
 *  onMissing?: (key: string, lang: string) => string
 * }}
 */
export function setup(
  {
    defaultLang,
    format,
    onMissing,
    cache = new Map<string, string>(),
    cacheSize = 1000,
  }: Partial<I18nSetup>,
) {
  settings.defaultLang = defaultLang;
  settings.format = { ...settings.format, ...format };
  settings.onMissing = onMissing;
  settings.cache = cache;
  settings.cacheSize = cacheSize;
}

/**
 * Reads translation settings from a context, returns translation utilities.
 *
 * @param {Context<T & I18nContext>} context
 * @param {I18nSetup} config
 * @returns {I18n, Message, t, lang}
 */
export function useI18n<T>(
  context: Context<T & I18nContext>,
  config: I18nSetup = settings,
) {
  const ctx = useContext(context);
  const { lang, lc } = ctx;
  const { defaultLang, debug, format, onMissing } = config;
  const _cache = limitedCache(config);
  useDebugValue("useI18n", () => lang);
  return { I18n, Message, t, lang };

  /**
   * Useful when there are different markup for each language
   * or when you translate inplace.
   */
  function I18n(props: I18nProps): VNode {
    for (const child of props.children) {
      if (child.props.lang === lang) {
        return child;
      }
    }
    return props.children[0];
  }

  /**
   * Translates a string to the current language.
   */
  function Message({ children }: LcMessageProps): VNode {
    if (typeof children === "string") {
      return h(Fragment, {
        children: lc && lc[lang] ? t(lc[lang][children]) : t(children),
      } as LcMessageProps);
    }

    return h(Fragment, {
      children: t(children[lang] ?? ""),
    } as LcMessageProps);
  }

  /**
   * Formats a string with the current language.
   * - The template literal is %key, where key is a key name in the data object or array index.
   * - The key can be followed by a format metod, e.g. %key:upper.
   * - The default escape character is `%`.
   *
   * Examples:
   * ```
   *  t("Hello, %name", { name: "John" }) -> "Hello, John"
   *  t("Hello, %%name", { name: "John" }) -> "Hello, %name"
   *  t("Hello, %name:upper", { name: "John" }) -> "Hello, JOHN"
   *  t("Hello, %0 %1", "John", "Doe") -> "Hello, John Doe"
   *  t("Hello, %0 %1:upper", "John", "Doe") -> "Hello, John DOE"
   *  t("Hello, %%0 %1", "John", "Doe") -> "Hello, %0 Doe"
   * ```
   */
  function t(key: string, ...args: unknown[]): string {
    let template = lc?.[lang]?.[key] ?? lc?.[defaultLang ?? ""]?.[key];

    if (!template) {
      onMissing?.(key, ctx);
      template = key;
    }

    // deno-lint-ignore no-explicit-any
    let data: any = args;
    if (
      args.length === 1 &&
      (args[0] as Record<string, unknown>).constructor === Object
    ) {
      data = args[0] as Record<string, unknown>;
    }

    let result = _cache?.get(template);
    if (!result) {
      result = getFormatKeys(template).reduce((p, c) => {
        const [name, formatFn] = parseFormatterName(c);
        if (debug && formatFn && !format[formatFn]) {
          console.warn(
            `useI18n.t ${lang}: Missing format function "${formatFn}"`,
          );
          console.warn(
            `useI18n.t ${lang}: Template: "${template}", Key: "${c}"`,
          );
        }
        const value =
          (format[formatFn]?.(data[name], ctx) ?? data[name]) as string;
        if (debug && !value) {
          console.warn(
            `useI18n.t ${lang}: Missing value for "${name}", with format function "${formatFn}"`,
          );
          console.warn(`useI18n.t ${lang}: Template: "${template}"`);
        }
        return p.replaceAll(`%${c}`, value);
      }, template)
        .replace(config.escapePattern, "$1");
      _cache?.set(template, result);
    }

    return result;
  }

  /**
   * %key:format -> [key, format]
   */
  function parseFormatterName(key: string) {
    return key
      .replace(config.pattern, "$1")
      .split(":");
  }

  /**
   * Returns an array of keys in the template.
   * - %key
   * - %key:format
   */
  function getFormatKeys(template: string) {
    return [...template.matchAll(config.pattern)].map((m) => m[1]);
  }
}

function limitedCache(settings: I18nSetup) {
  const cache = settings.cache;
  return cache
    ? {
      get: (key: string) => cache.get(key),
      set(key: string, value: string) {
        cache.set(key, value);
        if (cache.size > settings.cacheSize!) {
          cache.delete(cache.keys().next().value);
        }
      },
    }
    : undefined;
}

export function invalidateCache() {
  settings?.cache?.clear();
}
