import { useI18n } from "tailored/hooks/useI18n.ts";
import Context from "@/tests/context.ts";

export default function $Localized() {
  const { t, I18n, Message } = useI18n(Context);
  return (
    <I18n>
    </I18n>
  );
}
