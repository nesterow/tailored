import { animation, css, keyframes } from "twind";

const typeEffect = keyframes({
  "from": {
    width: "0%",
  },
  "to": {
    width: "100%",
  },
});

const cursorEffect = keyframes({
  "from": {
    borderRightWidth: "3px",
    borderRightColor: "rgba(0, 184, 0, 0.75)",
  },
  "to": {
    borderRightWidth: "3px",
    borderRightColor: "transparent",
  },
});

export const typeAnimation = () =>
  css({
    whiteSpace: "nowrap",
    overflow: "hidden",
    animation:
      `2s steps(29,end) 1s 1 normal both ${typeEffect}, 0.5s steps(29,end) 4 normal both ${cursorEffect}`,
  });

const appearEffect = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});
export const appearAnimation = () =>
  animation(
    "2s ease-in-out forwards 1s",
    appearEffect,
  );

const shakeEffect = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "25%": {
    transform: "rotate(1.5deg)",
  },
  "75%": {
    transform: "rotate(-1.5deg)",
  },
  "100%": {
    transform: "rotate(0deg)",
  },
});
export const shakeAnimation = () =>
  animation(
    "15s ease-in-out infinite",
    shakeEffect,
  );

export const appearShakeAnimation = () =>
  css({
    opacity: "0",
    animation:
      `${appearEffect} 2s ease-in-out forwards 1s, ${shakeEffect} 15s ease-in-out infinite`,
    transformOrigin: "center",
  });

const rotateEffect = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});
export const slowRotateAnimation = () =>
  animation(
    "120s ease-in-out infinite",
    rotateEffect,
  );

const boldenPathEffect = keyframes({
  "0%": {
    opacity: .6,
    strokeWidth: "1",
  },
  "50%": {
    opacity: .2,
    strokeWidth: "1.5",
  },
  "100%": {
    opacity: 1,
    strokeWidth: "2",
  },
});

export const boldPathAnimation = () =>
  animation(
    ".45s ease-in forwards",
    boldenPathEffect,
  );

export const bgAnimation = () =>
  animation(
    "3s ease",
    keyframes({
      "0%": {
        backgroundColor: "#000f1c",
      },
      "100%": {
        backgroundColor: "#ffffff",
      },
    }),
  );
