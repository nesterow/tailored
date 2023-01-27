import { useContext } from "preact/hooks";
import { RenderContext } from "@/components/system/context.ts";
import { I18n } from "@/components/system/i18n.tsx";
import MenuLink from "@/islands/MenuLink.tsx";
import LangSwitcher from "@/islands/LangSwitcher.tsx";
import MenuButton from "@/islands/MenuButton.tsx";

const LANGUAGES = Deno.env.get("LANGUAGES")?.split(",") ?? ["en"];

export default function Menu() {
  const { lang } = useContext(RenderContext);
  return (
    <section class="w-full flex justify-between px-6">
      <div>
        <MenuButton
          container="[data-site-header]"
          target="[data-mobile-menu]"
          size={30}
          className="mb-3 md:hidden"
          toggleClass="menu-open"
        />
      </div>
      <div data-mobile-menu class="h-0 overflow-hidden md:h-auto flex gap-6">
        <I18n>
          <MenuLink lang="en" href="/en">
            About
          </MenuLink>
          <MenuLink lang="ru" href="/ru">
            Основное
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/en/capabilities">
            Capabilities
          </MenuLink>
          <MenuLink lang="ru" href="/ru/capabilities">
            Возможности
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/en/stack">
            Stack
          </MenuLink>
          <MenuLink lang="ru" href="/ru/stack">
            Технологии
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/en/cases">
            Cases
          </MenuLink>
          <MenuLink lang="ru" href="/ru/cases">
            Кейсы
          </MenuLink>
        </I18n>
        <I18n>
          <MenuLink lang="en" href="/en/hire">
            Hire
          </MenuLink>
          <MenuLink lang="ru" href="/ru/hire">
            Контакты
          </MenuLink>
        </I18n>
      </div>
      <LangSwitcher
        className="-mt-2 mr-4"
        lang={lang}
        languages={LANGUAGES}
      />
    </section>
  );
}
