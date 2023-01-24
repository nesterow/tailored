import { Options } from "$fresh/plugins/twind.ts";

const mainColors = {
  main: "#800856",
  blue: "#000082",
  blood: "#ac2424",
};
export default {
  theme: {
    extend: {
      colors: mainColors,
      textColor: mainColors,
    },
  },
  plugins: {
    apear: {},
    shake: {},
    "apear-shake": {},
    "slow-rotate": {},
  },
} as Pick<Options, "theme">;
