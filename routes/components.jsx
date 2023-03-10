// Output of `watch_mdx`. DO NOT EDIT.
// This file is generated automatically.

/*@jsxRuntime automatic @jsxImportSource preact*/
import { Head } from "$fresh/runtime.ts";
import HexoCube from "@/islands/HexoCube.tsx";
import LazyHexoCube from "@/islands/LazyHexoCube.tsx";
import ReadmePage from "@/components/Layouts/ReadmePage.tsx";
import PopoverShowcase from "@/islands/PopoverShowcase.tsx";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    hr: "hr",
    blockquote: "blockquote",
    p: "p",
    h2: "h2",
    pre: "pre",
    code: "code",
    ul: "ul",
    li: "li",
  }, props.components);
  return (
    <>
      <Head>
        <title>{"MDX"}</title>
        <meta name="description" content="HexoCube" />
      </Head>
      {"\n"}
      <ReadmePage className="prose relative flex p-2 mx-auto max-w-screen-lg">
        <_components.h1>{"Popover"}</_components.h1>
        <PopoverShowcase />
        <_components.hr />
        <_components.h1>{"MDX"}</_components.h1>
        <_components.blockquote>
          {"\n"}
          <_components.p>{"Let's check if it works"}</_components.p>
          {"\n"}
        </_components.blockquote>
        <_components.h2>{"HexoCube (island)"}</_components.h2>
        <HexoCube width={500} height={500} title="HexoCube Island" play />
        <_components.h2>{"Just some text"}</_components.h2>
        <_components.blockquote>
          {"\n"}
          <_components.p>{"Hello world"}</_components.p>
          {"\n"}
        </_components.blockquote>
        <_components.pre>
          <_components.code className="language-typescript">
            {"const hello = 'world';\nconsole.log(hello);\n"}
          </_components.code>
        </_components.pre>
        <_components.h2>{"Markdown"}</_components.h2>
        <_components.ul>
          {"\n"}
          <_components.li>{"Item 1"}</_components.li>
          {"\n"}
          <_components.li>
            {"Item 2"}
            {"\n"}
            <_components.ul>
              {"\n"}
              <_components.li>{"Item 2.1"}</_components.li>
              {"\n"}
              <_components.li>{"Item 2.2"}</_components.li>
              {"\n"}
            </_components.ul>
            {"\n"}
          </_components.li>
          {"\n"}
          <_components.li>{"Item 3"}</_components.li>
          {"\n"}
        </_components.ul>
        <_components.h1>{"Popover"}</_components.h1>
        <PopoverShowcase />
        <_components.hr />
        <LazyHexoCube
          width={500}
          height={500}
          title="LazyHexoCube Island"
          play
        />
      </ReadmePage>
    </>
  );
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || ({});
  return MDXLayout
    ? (
      <MDXLayout {...props}>
        <_createMdxContent {...props} />
      </MDXLayout>
    )
    : _createMdxContent(props);
}
export default MDXContent;
