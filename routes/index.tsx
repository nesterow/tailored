import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Landing from "@/components/Landing/Landing.tsx";
import Context from "@/context.ts";
import { getLanguage, i18nIndexConfig } from "tailored/handlers/i18nRoute.ts";

export const config = i18nIndexConfig();

export default function Index({ url }: PageProps) {
  return (
    <Context.Provider
      value={{
        lang: getLanguage(url),
      }}
    >
      <Head>
        <title>nesterov.digital</title>
      </Head>
      <Landing />
    </Context.Provider>
  );
}
