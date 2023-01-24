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
    console.log(wrapperRef.current?.classList);
  }
  return (
    <div className={"relative h-0 " + className}>
      <a onClick={toggle} class="cursor-pointer">
        {lang}
      </a>
      <div
        ref={wrapperRef}
        class="flex gap-1 flex-col absolute top-0 w-auto h-0 overflow-hidden transition bg-white "
      >
        <a lang="en" href="/en">
          EN
        </a>
        <a lang="ru" href="/ru">
          RU
        </a>
      </div>
    </div>
  );
}
