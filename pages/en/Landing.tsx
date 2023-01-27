import HexoCube from "@/islands/HexoCube.tsx";
import ColorfulLink from "@/components/ColorfulLink.tsx";
import StackIcons from "@/islands/StackIcons.tsx";
import IconArrowGuide from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/arrow-guide.tsx";

export default function Landing() {
  return (
    <>
      <div class="flex flex-col items-center justify-start">
        <HexoCube className="slow-rotate" width="210" height="210" play />
        <a href="/#" class="text-[red] font-thin opacity-60">
          Nesterov.Digital
        </a>

        <h5 class="text-blood text-2xl font-thin mt-16 mb-4 apear">
          What can I help you with?
        </h5>
        <div class="apear">
          <div class="flex items-center gap-1 mb-4 text-center opacity-70">
            <ColorfulLink
              lineHeight={7}
              href="/hire"
              className="!font-thin py-2 px-2 text-blue hover:!text-black transition"
              active
            >
              IT Consult
            </ColorfulLink>
            <IconArrowGuide size={20} color="red" class="opacity-20" />
            <ColorfulLink
              lineHeight={7}
              href="/hire"
              className="!font-thin py-2 px-2 text-blue hover:!text-black transition"
              active
            >
              Create MVP
            </ColorfulLink>
            <IconArrowGuide
              size={20}
              color="red"
              class="opacity-20"
              style={{
                transform: "scale3d(1,-1,1)",
              }}
            />
            <ColorfulLink
              lineHeight={7}
              href="/hire"
              className="!font-thin py-2 px-2 text-blue hover:!text-black transition"
              active
            >
              Build a team
            </ColorfulLink>
          </div>
        </div>

        <section class="text-center mt-12 flex flex-col w-full justify-center items-center">
          <h1
            data-type-effect
            class="text-2xl sm:text-3xl text-blood font-thin mb-4"
          >
            Tailored Software Development
          </h1>
          <p class="apear text-sm font-thin mb-4 text-blue opacity-60">
            Crafting custom software solutions, to fit your unique business
            needs
          </p>
          <p class="apear mt-1 p-1 text-main font-thin md:w-2/4">
            With a <span class="text-blue">decade of experience</span>{" "}
            in the software development, guiding your business through{" "}
            <span class="text-blue">the entire development cycle</span>, from
            initial prototype to final production.
          </p>
        </section>

        <h5 class="text-blood text-2xl font-thin mt-14 apear">Technologies</h5>
        <StackIcons className="flex flex-wrap justify-center w-full md:w-2/3 px-6 apear opacity-100" />

        {
          /* <ColorfulLink
          href="/hire"
          className="apear-shake !font-thin mt-6 py-2 px-6 !text-blue hover:!text-black transition"
          active
        >
          Contacts
        </ColorfulLink> */
        }
      </div>
    </>
  );
}
