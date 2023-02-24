import { assert } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { I18nContext, setup } from "tailored/hooks/useI18n.ts";
import { createContext, h } from "preact";
import { render } from "preact-render-to-string";
import { WrapT } from "./mocks/i18n/Components.tsx";

const { test } = Deno;

test("useI18n", async (t) => {
  setup({
    debug: true,
    defaultLang: "en",
    format: {
      currency: (value: number, { lang }) =>
        value.toLocaleString(lang, {
          style: "currency",
          currency: "USD",
          currencyDisplay: "code",
        }),
    },
  });

  const ctx = createContext<I18nContext>({
    lang: "en",
    lc: {},
  });

  await t.step("useI18n.t : simple string", () => {
    const result = render(h(WrapT, {
      ctx,
      lang: "ru",
      lc: {
        ru: { "Hello World": "Привет Мир" },
      },
      template: "Hello World",
      data: {},
    }));
    assert(result.includes("Привет Мир"));
  });

  await t.step("useI18n.t : interpolation", () => {
    const result = render(h(WrapT, {
      ctx,
      lang: "ru",
      lc: {
        ru: { "%name, %age": "%age, %name" },
      },
      template: "%name, %age",
      data: {
        name: "John",
        age: 30,
      },
    }));
    assert(result.includes("30, John"));
  });

  await t.step("useI18n.t : interpolation positional", () => {
    const result = render(h(WrapT, {
      ctx,
      lang: "ru",
      lc: {
        ru: { "%0, %1": "%1, %0" },
      },
      template: "%0, %1",
      data: ["John", 30],
    }));
    assert(result.includes("30, John"));
  });

  await t.step("useI18n.t : format ", () => {
    const result_ru = render(h(WrapT, {
      ctx,
      lang: "ru",
      lc: {
        ru: { "Cost: %price:currency": "Стоимость: %price:currency" },
      },
      template: "Cost: %price:currency",
      data: {
        price: 30.5,
      },
    }));

    assert(result_ru.includes(30.5.toLocaleString("ru", {
      currencyDisplay: "code",
      currency: "USD",
      style: "currency",
    })));

    const result_en = render(h(WrapT, {
      ctx,
      lang: "en",
      lc: {},
      template: "Cost: %price:currency",
      data: {
        price: 30.5,
      },
    }));

    assert(result_en.includes(30.5.toLocaleString("en", {
      currencyDisplay: "code",
      currency: "USD",
      style: "currency",
    })));
  });
});
