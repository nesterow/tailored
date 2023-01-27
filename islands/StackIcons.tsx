import RandomActivate from "@/components/RandomActivate.tsx";

export default function StackIcons(props: { className?: string }) {
  const icons = [
    "deno",
    "typescript",
    "react",
    "node-js",
    "python",
    "tensorflow",
  ];
  return (
    <RandomActivate
      activateClass="opacity-100"
      delay={2300}
      className={props.className}
    >
      {icons.map((name, i) => (
        <img
          title={name}
          src={`/img/stack/${name}.svg`}
          style={{ animationDelay: `${0.5 * i}s` }}
          class="shake w-20 m-6 opacity-40 hover:opacity-100 transition-opacity duration-[.76s]"
        />
      ))}
    </RandomActivate>
  );
}
