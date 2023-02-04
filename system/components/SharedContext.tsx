import { useContext } from "preact/hooks";
import { RenderContext } from "../context.ts";
import { Head } from "$fresh/runtime.ts";

export default function SharedContext() {
  if (typeof document !== "undefined") {
    throw new Error("SharedContext.tsx should be used only on server side");
  }
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
