import { PageProps } from "$fresh/server.ts";
import $TestLayout from "../layouts/$TestLayout.tsx";
import { RenderContext } from "@/components/system/context.ts";
import SharedContext from "@/components/system/SharedContext.tsx";
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
