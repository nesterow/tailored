import { JSX } from "preact";
import { useContext } from "preact/hooks";
import Context from "@/context.ts";

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
/**
 * Good for static components and pages that might have slightly different styles for different languages.
 * It plays better when your app has heavy design and a lot of translations to different languages.
 */
export default function I18n(props: I18nProps) {
  const { lang } = useContext(Context);
  for (const child of props.children) {
    if (child.props.lang === lang) {
      return child;
    }
  }
  return props.children[0];
}

interface LcMessageProps {
  children: string | { [key: string]: string };
}

/**
 * Good for short strings.
 * TODO: if or when we build an app, we will need a utility to generate a dictionary in json or csv formats.
 */
export function Message({ children }: LcMessageProps) {
  const { lang, lc } = useContext(Context);
  if (typeof children === "string") {
    return (
      <>
        {lc && lc[lang] ? lc[lang][children] : children}
      </>
    );
  }

  return (
    <>
      {children[lang] || children[0] || ""}
    </>
  );
}
