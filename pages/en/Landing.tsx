import HexoCube from "@/islands/HexoCube.tsx";
import ColorfulLink from "@/components/ColorfulLink.tsx";
import StackIcons from "@/islands/StackIcons.tsx";
import IconArrowGuide from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/arrow-guide.tsx";
import { cx, tw } from "twind";

const action_link_style = cx`
  menu-link
  text-[#444]
  font-mono
  hover:!text-blood
  py-2
  px-2
  transition
`;

export default function Landing() {
  return (
    <>
      <div class="flex flex-col items-center justify-start">
        <HexoCube className="slow-rotate" width="250" height="250" play />
        <a href="/#" class="text-[red] no-underline font-thin opacity-60">
          Nesterov.Digital
        </a>

        <section class="text-center mt-12 flex flex-col w-full justify-center items-center">
          <h1 class="typing text-2xl sm:text-4xl text-blood font-thin mb-4">
            Tailored Software Development
          </h1>
          <p class="appear font-thin mb-4 text-blue">
          </p>
          <p class="appear text-sm mt-1 p-1 text-[#444] font-mono font-thin md:w-2/4">
            With a <span class="text-main">decade of experience</span>{" "}
            in the software development, guiding your business through{" "}
            <span class="text-main">the entire development cycle</span>, from
            initial prototype to final production.
          </p>
        </section>

        <h5 class="text-blood sm:text-3xl font-thin mt-16 mb-4 appear">
          What can I help you with?
        </h5>
        <div class="appear">
          <div class="flex items-center gap-1 mb-4 text-center opacity-70">
            <ColorfulLink
              lineHeight={5}
              href="/hire"
              className={tw(action_link_style)}
              active
            >
              IT Consult
            </ColorfulLink>
            <IconArrowGuide size={20} color="red" class="opacity-60" />
            <ColorfulLink
              lineHeight={5}
              href="/hire"
              className={tw(action_link_style)}
              active
            >
              Create MVP
            </ColorfulLink>
            <IconArrowGuide
              size={20}
              color="red"
              class="opacity-60"
              style={{
                transform: "scale3d(1,-1,1)",
              }}
            />
            <ColorfulLink
              lineHeight={5}
              href="/hire"
              className={tw(action_link_style)}
              active
            >
              Build a team
            </ColorfulLink>
          </div>
        </div>

        <h5 class="text-blood sm:text-2xl font-thin mt-14 appear">
          Technologies
        </h5>
        <StackIcons className="flex flex-wrap justify-center w-full md:w-2/3 px-6 appear" />
      </div>
    </>
  );
}
