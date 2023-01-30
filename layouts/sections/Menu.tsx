import { useContext } from "preact/hooks";
import { RenderContext } from "@/components/system/context.ts";
import { I18n } from "@/components/system/i18n.tsx";
import MenuLink from "@/islands/MenuLink.tsx";
import LangSwitcher from "@/islands/LangSwitcher.tsx";
import MenuButton from "@/islands/MenuButton.tsx";
import { apply, tw } from "twind";

const LANGUAGES = Deno.env.get("LANGUAGES")?.split(",") ?? ["en"];

const mobile_menu_close_style = apply`
  h-[0vh]
  overflow-y-hidden
  md:h-auto
  md:overflow-y-auto
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
  opacity-90
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
  const { lang } = useContext(RenderContext);
  return (
    <section className={tw(menu_wrapper_style)}>
      <div>
        <MenuButton
          container="[data-site-header]"
          target="[data-mobile-menu]"
          size={30}
          className="mb-3 md:hidden"
          toggleAddClass={tw(mobile_menu_open_style, "mt-4")}
          toggleRemoveClass={tw(mobile_menu_close_style)}
        />
      </div>
      <div
        data-mobile-menu
        className={tw(mobile_menu_close_style, menu_container_style)}
      >
        <I18n>
          <MenuLink lang="en" href="/">
            About
          </MenuLink>
          <MenuLink lang="ru" href="/ru">
            Основное
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/capabilities">
            Capabilities
          </MenuLink>
          <MenuLink lang="ru" href="/ru/capabilities">
            Возможности
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/stack">
            Stack
          </MenuLink>
          <MenuLink lang="ru" href="/ru/stack">
            Технологии
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/cases">
            Cases
          </MenuLink>
          <MenuLink lang="ru" href="/ru/cases">
            Кейсы
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/hire">
            Hire
          </MenuLink>
          <MenuLink lang="ru" href="/ru/hire">
            Контакты
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
