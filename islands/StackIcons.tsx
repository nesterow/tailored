import RandomActivate from "@/components/RandomActivate.tsx";
import { useState } from "preact/hooks";
import { tw } from "twind/core";

export default function StackIcons(props: { className?: string }) {
  const [active, setActive] = useState("");
  const icons = [
    "deno",
    "typescript",
    "react",
    "node-js",
    "python",
    "tensorflow",
  ];
  function onActivate(e: CustomEvent) {
    setActive(e.detail.title.replace(/-/g, "").toUpperCase());
  }
  return (
    <>
      <RandomActivate
        activateClass={tw("opacity-100")}
        deactiveClass={tw("opacity-40")}
        delay={2300}
        className={props.className}
        onActivate={onActivate}
      >
        {icons.map((name, i) => (
          <img
            title={name}
            src={`/img/stack/${name}.svg`}
            style={{ animationDelay: `${0.5 * i}s` }}
            class="shake w-20 m-6 p-2 hover:opacity-100 transition-opacity duration-[.76s] opacity-40"
          />
        ))}
      </RandomActivate>
      <div class="w-full font-mono text-center text-blue opacity-40 mb-16 mt-4">
        {active}
      </div>
    </>
  );
}
