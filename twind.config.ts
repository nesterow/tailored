import { apply, Configuration } from "twind";
import { css } from "twind/css";
import {
  appearAnimation,
  appearShakeAnimation,
  bgAnimation,
  boldPathAnimation,
  shakeAnimation,
  slowRotateAnimation,
  typeAnimation,
} from "@/components/animations.ts";

const colors = {
  main: "#800856",
  blue: "#000082",
  blood: "#ac2424",
  light: "#fffdf099",
};

export default {
  darkMode: "class",
  theme: {
    extend: {
      colors,
      textColor: colors,
      backgroundColor: colors,
    },
  },
  preflight: {
    "html": css({
      scrollBehavior: "smooth",
    }),
    "body": apply(
      bgAnimation,
      "relative",
      "min-h-[100vh]",
      "font-sans",
    ),
    "h1": apply(
      "text-4xl",
      "font-bold",
    ),
    "a svg path[name='colors']": apply(
      "hidden",
      "opacity-[0.6]",
    ),
    "a:hover svg path[name='colors']": apply(
      boldPathAnimation,
      "block",
      "opacity-1",
    ),
    "a[active] svg path[name='colors']": apply("block"),
    "a:active svg path[name='colors']": apply("block"),
    "[data-type-effect]": apply(typeAnimation),
  },
  plugins: {
    "appear": apply(
      appearAnimation,
      "opacity-0",
    ),
    "shake": apply(
      shakeAnimation,
      "transform-origin-center",
    ),
    "appear-shake": apply(appearShakeAnimation),
    "slow-rotate": apply(
      slowRotateAnimation,
      "transform-origin-center",
    ),
  },
} as Configuration;
