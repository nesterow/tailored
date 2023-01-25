import HexoCube from "@/islands/HexoCube.tsx";
import ColorfulLink from "@/components/ColorfulLink.tsx";
import RandomActivate from "@/islands/RandomActivate.tsx";

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
            Заказная разработка ПО
          </h1>
          <p class="apear font-thin mb-4 text-blue opacity-60">
            Crafting custom software solutions, to fit your unique business
            needs
          </p>
          <p class="apear mt-1 p-1 text-2xl text-main font-thin md:w-3/4">
            With a <span class="text-blue">decade of experience</span>
            in the software development, guiding your business through
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
        <section class="flex flex-wrap justify-center w-full md:w-2/3 mt-20 px-6 apear opacity-100">
          <RandomActivate
            activateClass="opacity-100"
            selector="img[data-blinking-stars]"
            delay={2300}
          />
          {["deno", "typescript", "react", "node-js", "python", "tensorflow"]
            .map((name, i) => (
              <img
                data-blinking-stars
                title={name}
                src={`/img/${name}.svg`}
                style={{ animationDelay: `${0.5 * i}s` }}
                class="shake w-20 m-6 opacity-40 hover:opacity-100 transition-opacity duration-[.76s]"
              />
            ))}
        </section>
      </div>
    </>
  );
}
