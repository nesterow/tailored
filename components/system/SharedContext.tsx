import { useContext } from "preact/hooks";
import { RenderContext } from "./context.ts";
import { Head } from "$fresh/runtime.ts";

export default function SharedContext() {
  return (
    <Head>
      <script
        type="application/json"
        id="shared-context"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(useContext(RenderContext)),
        }}
      >
      </script>
    </Head>
  );
}
