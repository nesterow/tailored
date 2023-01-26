import { useRef } from "preact/hooks";
import ClickOutside from "@/components/ClickOutside.tsx";

interface LangSwitcherProps {
  lang: string;
  languages: string[];
  className?: string;
}

export default function LangSwitcher(
  { lang, languages, className }: LangSwitcherProps,
) {
  const menuRef = useRef<HTMLDivElement>(null);
  function toggle() {
    menuRef.current?.classList.toggle("h-0");
  }
  function close() {
    menuRef.current?.classList.add("h-0");
  }
  return (
    <ClickOutside onClickOutside={close}>
      <div className={"relative h-0 " + className}>
        <a onClick={toggle} class="cursor-pointer">
          {lang.toLocaleUpperCase()}
        </a>
        <div
          ref={menuRef}
          class="flex flex-wrap gap-2 absolute top-0 h-0 w-[3.5rem] overflow-hidden transition bg-white "
        >
          {languages.map((language) => (
            <a
              class="text-blue hover:text-blood"
              lang="en"
              href={`/` + language}
            >
              {language.toLocaleUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </ClickOutside>
  );
}
