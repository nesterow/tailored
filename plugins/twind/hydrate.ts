import { Options, STYLE_ELEMENT_ID } from "./shared.ts";
import { getSheet, setup } from "twind";

type State = [string, string][];

export default function hydrate(options: Options, _state: State) {
  const el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  const sheet = getSheet();
  setup(options, sheet, el);
}
