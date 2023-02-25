import Page from "@/components/Layouts/Page.tsx";
import { useI18n } from "tailored/hooks/useI18n.ts";
import Context from "@/context.ts";

import LandingEn from "./LandingEn.tsx";
import LandingRu from "./LandingRu.tsx";

export default function Landing() {
  const { I18n } = useI18n(Context);
  return (
    <Page>
      <I18n>
        <LandingEn lang="en" />
        <LandingRu lang="ru" />
      </I18n>
    </Page>
  );
}
