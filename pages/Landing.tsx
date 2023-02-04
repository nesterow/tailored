import Page from "@/layouts/Page.tsx";
import I18n from "tailored/components/i18n.tsx";

import LandingEn from "./en/Landing.tsx";
import LandingRu from "./ru/Landing.tsx";

export default function Landing() {
  return (
    <Page>
      <I18n>
        <LandingEn lang="en" />
        <LandingRu lang="ru" />
      </I18n>
    </Page>
  );
}
