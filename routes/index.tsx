import Page from "@/components/Layouts/Page.tsx";
import HexoCube from "@/islands/HexoCube.tsx";
import ColorfulLink from "@/components/ColorfulLink.tsx";
import StackIcons from "@/islands/StackIcons.tsx";
import { ArrowGuideIcon } from "@/components/icons.ts";
import { cx, tw } from "twind/core";
import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

const action_link_style = cx`
  menu-link
  text-[#444]
  font-mono
  hover:!text-blood
  py-2
  px-2
  transition
`;

import Context from "@/context.ts";
import { getLanguage, i18nIndexConfig } from "tailored/handlers/i18nRoute.ts";

export const config = i18nIndexConfig();

export default function Index({ url }: PageProps) {
  return (
    <Context.Provider
      value={{
        lang: getLanguage(url),
        lc: {},
      }}
    >
      <Head>
        <title>Tailored - Components & Hooks</title>
      </Head>
      <Page>
        <div class="flex flex-col items-center justify-start">
          <HexoCube
            title="Tailored Components"
            className="text-center"
            width="200"
            height="200"
            play
          />

          <h5 class="sm:text-3xl font-thin mt-16 mb-4">
            Getting started
          </h5>
          <div class="appear">
            <div class="flex items-center gap-1 mb-4 text-center opacity-70">
              <ColorfulLink
                underlineHeight={5}
                href="/hire"
                className={tw(action_link_style)}
                active
              >
                IT Consult
              </ColorfulLink>
              <ArrowGuideIcon size={20} color="red" class="opacity-60" />
              <ColorfulLink
                underlineHeight={5}
                href="/hire"
                className={tw(action_link_style)}
                active
              >
                Create MVP
              </ColorfulLink>
              <ArrowGuideIcon
                size={20}
                color="red"
                class="opacity-60"
                style={{
                  transform: "scale3d(1,-1,1)",
                }}
              />
              <ColorfulLink
                underlineHeight={5}
                href="/hire"
                className={tw(action_link_style)}
                active
              >
                Build a team
              </ColorfulLink>
            </div>
          </div>

          {
            /* <h5 class="text-blood sm:text-2xl font-thin mt-14 appear">
            Technologies
          </h5>
          <StackIcons className="flex flex-wrap justify-center w-full md:w-2/3 px-6 appear" /> */
          }
        </div>
      </Page>
    </Context.Provider>
  );
}
