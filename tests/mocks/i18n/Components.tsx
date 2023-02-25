// deno-lint-ignore-file no-explicit-any
import type { Context } from "preact";
import { I18nContext, useI18n } from "tailored/hooks/useI18n.ts";

type Props = {
  lang: string;
  ctx: Context<I18nContext>;
  lc: I18nContext["lc"];
  template: string;
  data: any;
};

export function WrapT({ lang, ctx, lc, template, data }: Props) {
  return (
    <ctx.Provider
      value={{
        lang,
        lc,
      }}
    >
      <TFunction ctx={ctx} template={template} data={data} />
    </ctx.Provider>
  );
}

export function TFunction({ template, ctx, data }: Partial<Props>) {
  const { t } = useI18n(ctx!);
  const args = Array.isArray(data) ? data : [data];
  return (
    <span id="translation">
      {t(template!, ...args)}
    </span>
  );
}
