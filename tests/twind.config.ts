import { Options } from "$fresh/plugins/twind.ts";

const mainColors = {
  main: "#800856",
  blue: "#000082",
  blood: "#ac2424",
  light: "#fffdf099",
};
export default {
  theme: {
    extend: {
      colors: mainColors,
      textColor: mainColors,
      backgroundColor: mainColors,
    },
  },
  plugins: {
    apear: () => ({
      opacity: 0,
      animation: "appear 2s ease-in-out forwards 1s",
    }),
    shake: {
      animation: "shake 15s infinite",
      transformOrigin: "center",
      animationTimingFunction: "ease-in-out",
    },
    "apear-shake": {
      opacity: 0,
      animation: "appear 2s ease-in-out forwards 1s, shake 15s infinite",
      transformOrigin: "center",
      animationTimingFunction: "ease-in-out",
    },
    "slow-rotate": {
      animation: "rotate 120s infinite",
      transformOrigin: "center",
      animationTimingFunction: "ease-in-out",
    },
  },
} as Pick<Options, "theme">;
