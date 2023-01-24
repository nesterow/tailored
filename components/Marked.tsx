// @deno-types="https://cdn.jsdelivr.net/npm/@types/marked@latest/index.d.ts"
import { marked } from "https://cdn.jsdelivr.net/npm/marked@latest/lib/marked.esm.js";
import { JSX } from "preact";

export default function Marked(props: { source: string }): JSX.Element {
  return (
    <section
      data-marked
      dangerouslySetInnerHTML={{
        __html: marked.parse(props.source),
      }}
    />
  );
}
