import { useI18n } from "tailored/hooks/useI18n.ts";
import Context from "@/context.ts";
import MenuLink from "@/islands/MenuLink.tsx";
import LangSwitcher from "@/islands/LangSwitcher.tsx";
import MenuButton from "@/islands/MenuButton.tsx";
import { apply, tw } from "twind/core";

const LANGUAGES = Deno.env.get("LANGUAGES")?.split(",") ?? ["en"];

const mobile_menu_close_style = apply`
  h-[0vh]
  overflow-y-hidden
  md:h-auto
  md:overflow-y-auto
  md:pb-2
`;
const mobile_menu_open_style = apply`
  h-[25vh!important]
  overflow-y-auto
`;
const menu_container_style = apply`
  flex-col
  gap-6
  w-full
  px-0
  md:w-auto
  md:h-auto
  md:mt-0
  md:px-1
  md:flex-row
  flex
  transition-all
  duration-300
  ease-in
  opacity-95
`;
const menu_wrapper_style = apply`
  w-full
  flex
  flex-col
  md:flex-row
  justify-between
  px-6
`;
const lang_switcher_style = apply`
  absolute
  right-12
  md:-mt-2
  md:mr-4
  md:relative
  md:right-0
`;

/**
 * Menu component
 */
export default function Menu() {
  const { I18n, lang } = useI18n(Context);
  return (
    <section className={apply(menu_wrapper_style)}>
      <div>
        <MenuButton
          size={30}
          target="[data-mobile-menu]"
          clickOutside="[data-site-header]"
          className="block mb-3 md:hidden"
          toggleAddClass={tw(apply(mobile_menu_open_style, "mt-4"))}
          toggleRemoveClass={tw(apply(mobile_menu_close_style))}
        />
      </div>
      <div
        data-mobile-menu
        data-prefetch
        className={apply(mobile_menu_close_style, menu_container_style)}
      >
        <I18n>
          <MenuLink lang="en" href="/">
            Get started
          </MenuLink>
          <MenuLink lang="ru" href="/ru">
            Старт
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/components">
            Components
          </MenuLink>
          <MenuLink lang="ru" href="/ru/components">
            Компоненты
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/hooks">
            Hooks
          </MenuLink>
          <MenuLink lang="ru" href="/ru/hooks">
            Хуки
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/plugins">
            Plugins
          </MenuLink>
          <MenuLink lang="ru" href="/ru/plugins">
            Плагины
          </MenuLink>
        </I18n>
      </div>
      <LangSwitcher
        className={tw(lang_switcher_style)}
        lang={lang}
        languages={LANGUAGES}
      />
    </section>
  );
}
