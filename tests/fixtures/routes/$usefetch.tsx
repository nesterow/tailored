import { PageProps } from "$fresh/server.ts";
import $TestLayout from "../components/$TestLayout.tsx";
import Context from "tailored/context.ts";
import SharedContext from "tailored/components/SharedContext.tsx";
import $WithContext from "../islands/$WithContext.tsx";

export default function $TestUseFetch({ data }: PageProps) {
  return (
    <Context.Provider
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
    </Context.Provider>
  );
}
