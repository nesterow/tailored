import { Context, Fragment, h, JSX, VNode } from "preact";
import { useContext } from "preact/hooks";

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
  formatters: Record<string, (value: unknown) => string>;
}

const settings: I18nSetup = {
  formatters: {},
};

export function setup({ formatters }: I18nSetup) {
  settings.formatters = formatters;
}

export function useI18n<T>(context: Context<T & I18nContext>) {
  const { lang, lc } = useContext(context);

  return { I18n, Message, t };

  /**
   * Good for static components and pages that might have
   * slightly different styles for different languages.
   * It plays better when your app has heavy design and
   * a lot of translations to different languages.
   * The downside is that the translations are hardcoded
   * and bundled with the component.
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
        children: lc && lc[lang] ? lc[lang][children] : children,
      } as LcMessageProps);
    }

    return h(Fragment, {
      children: t(children[lang] || children[0] || ""),
    } as LcMessageProps);
  }

  /**
   * TODO: format function calling settings.formatters, escaping, etc.
   */
  function t(string: string, ...args: unknown[]): string {
    const template = lc && lc[lang] ? lc[lang][string] : string;
    if (args.length === 0) return template;

    if (args.length === 1 && typeof args[0] === "object") {
      return Object.entries(args[0] as Record<string, string>).reduce(
        (p, [k, v]) => {
          return p.replace(new RegExp(`%${k}`, "g"), v as string);
        },
        template,
      );
    }

    return [...args as string[]].reduce((p, c) => {
      return p.replace(/%s/, c);
    }, template);
  }
}
