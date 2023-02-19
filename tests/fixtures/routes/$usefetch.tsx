import { PageProps } from "$fresh/server.ts";
import $TestLayout from "../components/$TestLayout.tsx";
import Context from "@/tests/context.ts";
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
      <$TestLayout>
        <$WithContext />
      </$TestLayout>
    </Context.Provider>
  );
}
