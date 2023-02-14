import { useContext } from "preact/hooks";
import Context from "../context.ts";
import { Head } from "$fresh/runtime.ts";
import { SHARED_CONTEXT_ID } from "../constants.ts";

/**
 * TODO: Isomorphic global store using useReducer and providing universal methods for hydration.
 * This component is used to share context between server and client.
 * Injects a script tag with the context data into the document head.
 *
 * Usage:
 *   import Context from "tailored/context.ts";
 *   import SharedContext from "tailored/components/SharedContext.tsx";
 *
 *   export default () => (
 *     <Context.Provider value={...}>
 *       <SharedContext />
 *     </Context.Provider>
 *   )
 */
export default function SharedContext() {
  if (typeof document !== "undefined") {
    throw new Error("SharedContext.tsx should be used only on server side");
  }
  return (
    <Head>
      <script
        type="application/json"
        id={SHARED_CONTEXT_ID}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(useContext(Context)),
        }}
      >
      </script>
    </Head>
  );
}
