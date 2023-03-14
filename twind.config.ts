import { defineConfig, Preset } from "twind/core";
import presetAutoprefix from "preset-autoprefix";
import twindPreset from "preset-tailwind";
import presetTypography from "preset-typography";

import {
  appearAnimation,
  appearShakeAnimation,
  bgAnimation,
  boldPathAnimation,
  shakeAnimation,
  slowRotateAnimation,
  typeAnimation,
  zapAnimation,
} from "@/components/animations.ts";

const colors = {
  main: "#800856",
  blue: "#000082",
  blood: "#ac2424",
  light: "#ffffff99",
};

export default defineConfig({
  darkMode: "class",
  hash: false,
  presets: [
    presetAutoprefix() as Preset<unknown>,
    twindPreset() as Preset<unknown>,
    presetTypography() as Preset<unknown>,
  ],
  theme: {
    extend: {
      colors,
      textColor: colors,
      backgroundColor: colors,
    },
  },
  variants: [
    ["active", "[active]"],
  ],
  rules: [
    ["appear", () => `opacity-0 ${appearAnimation()}`],
    ["shake", () => `transform-origin-center ${shakeAnimation()}`],
    ["appear-shake", () => `${appearShakeAnimation()}`],
    ["slow-rotate", () => `transform ${slowRotateAnimation()}`],
    ["typing", () => `${typeAnimation()}`],
    ["bg-animation", () => `${bgAnimation()}`],
    [
      "menu-link",
      () =>
        `no-underline opacity-[0.9] stroke-0 active:stroke-1 font-thin hover:${boldPathAnimation()}`,
    ],
    ["zap", () => `${zapAnimation()}`],
  ],
  preflight: {
    "html": {
      scrollBehavior: "smooth",
    },
    "body": {
      minHeight: "100vh",
    },
    "header": {
      backdropFilter: "blur(10px)",
    },
    "[data-marked] *:target": {
      paddingTop: "5em",
    },
  },
});
