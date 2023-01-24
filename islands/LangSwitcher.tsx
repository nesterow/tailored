import { useRef } from "preact/hooks";

interface LangSwitcherProps {
  lang: string;
  languages: string[];
  className?: string;
}

export default function LangSwitcher(
  { lang, languages, className }: LangSwitcherProps,
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  function toggle() {
    wrapperRef.current?.classList.toggle("h-0");
  }
  return (
    <div className={"relative h-0 " + className}>
      <a onClick={toggle} class="cursor-pointer">
        {lang.toLocaleUpperCase()}
      </a>
      <div
        ref={wrapperRef}
        class="flex flex-wrap gap-2 absolute top-0 h-0 w-[3.5rem] overflow-hidden transition bg-white "
      >
        {languages.map((language) => (
          <a class="text-blue hover:text-blood" lang="en" href={`/` + language}>
            {language.toLocaleUpperCase()}
          </a>
        ))}
      </div>
    </div>
  );
}
