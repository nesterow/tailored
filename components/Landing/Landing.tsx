import Page from "@/components/Layouts/Page.tsx";
import I18n from "@/components/i18n.tsx";

import LandingEn from "./LandingEn.tsx";
import LandingRu from "./LandingRu.tsx";

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
