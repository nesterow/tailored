import { PageProps } from "$fresh/server.ts";
import $TestLayout from "../layouts/$TestLayout.tsx";
import { RenderContext } from "tailored/context.ts";
import SharedContext from "tailored/components/SharedContext.tsx";
import $WithContext from "../islands/$WithContext.tsx";

export default function $TestUseFetch({ data }: PageProps) {
  return (
    <RenderContext.Provider
      value={{
        lang: "cn",
        headers: {
          "X-Test": "test",
        },
      }}
    >
      <SharedContext />
      <$TestLayout>
        <$WithContext />
      </$TestLayout>
    </RenderContext.Provider>
  );
}
