import HexoCube from "@/islands/HexoCube.tsx";
import ColorfulLink from "@/components/ColorfulLink.tsx";
import StackIcons from "@/islands/StackIcons.tsx";

export default function Landing() {
  return (
    <>
      <div class="flex flex-col items-center justify-start">
        <HexoCube className="slow-rotate" width="210" height="210" play />
        <a href="/#" class="text-[red] uppercase font-thin opacity-40">
          nesterov.digital
        </a>

        <section class="text-center mt-12 flex flex-col w-full justify-center items-center">
          <h1
            data-type-effect
            class="text-2xl sm:text-3xl md:text-4xl text-blood font-thin mb-4"
          >
            Tailored Software Development
          </h1>
          <p class="apear font-thin mb-4 text-blue opacity-60">
            Crafting custom software solutions, to fit your unique business
            needs
          </p>
          <p class="apear mt-1 p-1 text-2xl text-main font-thin md:w-3/4">
            With a <span class="text-blue">decade of experience</span>{" "}
            in the software development, guiding your business through{" "}
            <span class="text-blue">the entire development cycle</span>, from
            initial prototype to final production.
          </p>
          <ColorfulLink
            href="/#services"
            className="apear-shake !font-thin mt-12 py-2 px-6 !text-blue hover:!text-black transition"
            active
          >
            Hire me
          </ColorfulLink>
        </section>
        <StackIcons className="flex flex-wrap justify-center w-full md:w-2/3 mt-20 px-6 apear opacity-100" />
      </div>
    </>
  );
}
