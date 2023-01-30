/**
 * This file is intended for global styles.
 */
import { Options } from "$fresh/plugins/twind.ts";
import { apply } from "twind";
import { css } from "twind/css";

export const preflight: Options["preflight"] = {
  html: css({
    scrollBehavior: "smooth",
  }),
  body: apply`relative min-h-[100vh] bg-white font-sans`,
  h1: apply`text-4xl font-bold`,
  "[data-type-effect]": css({
    whiteSpace: "nowrap",
    overflow: "hidden",
    animation:
      "animated-text 2s steps(29,end) 1s 1 normal both, animated-cursor .5s steps(29,end) 4 normal both",
  }),
};
