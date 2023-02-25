import { PageProps } from "$fresh/server.ts";
import $TestLayout from "../components/$TestLayout.tsx";
import Context from "@/tests/context.ts";
import $WithContext from "../islands/$WithContext.tsx";

export default function $TestUseI18n({ data }: PageProps) {
  return (
    <Context.Provider
      value={{
        lang: "cn",
        lc: {},
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
