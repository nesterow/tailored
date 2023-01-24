import { JSX } from "preact";
import { useContext } from "preact/hooks";
import { RenderContext } from "./context.ts";

const DEFAULT_LANGUAGE = Deno.env.get("DEFAULT_LANGUAGE") || "en";
interface I18nProps {
  children: JSX.Element[];
}
/**
 * A strategy.
 * Good for static components and pages that might have slightly different styles for different languages.
 */
export function I18n(props: I18nProps) {
  const { lang } = useContext(RenderContext);
  for (const child of props.children) {
    if (child.props.lang === lang) {
      return child;
    }
  }
  return props.children.find((child) =>
    child.props.lang === DEFAULT_LANGUAGE
  ) || <></>;
}

interface LcMessageProps {
  children: string | { [key: string]: string };
}

/**
 * A dictionary.
 * Good for short strings.
 */
export function LcMessage({ children }: LcMessageProps) {
  const { lang, lc } = useContext(RenderContext);
  if (typeof children === "string") {
    return (
      <>
        {lc && lc[lang] ? lc[lang][children] : children}
      </>
    );
  }

  return (
    <>
      {children[lang] || children[DEFAULT_LANGUAGE] || ""}
    </>
  );
}
