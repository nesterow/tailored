import { JSX } from "preact";
import { useContext } from "preact/hooks";
import { RenderContext } from "./system/context.ts";

const DEFAULT_LANGUAGE = Deno.env.get("DEFAULT_LANGUAGE") || "en";
interface I18nProps {
  children: JSX.Element[];
}

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
