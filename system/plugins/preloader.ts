import { Plugin } from "$fresh/server.ts";

const ANIMATION = `preloader 12s ease infinite`;
const KEYFRAMES = `
@keyframes preloader {
  0% {
    width: 10%;
  }
  50% {
    width: 60%;
  }
  100% {
    width: 100%;
  }
}
`;

export default function preloader({ animation, keyframes, color, height } = {
  animation: ANIMATION,
  keyframes: KEYFRAMES,
  color: "linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)",
  height: "10px",
}): Plugin {
  const main = `data:application/javascript,
  export default function(_) {
    const preloader = document.getElementById("__preloader");
    const rules = preloader.sheet.rules[0];
    window.showPreloader = () => {
      rules.style.display = "block";
      rules.style.animation = "${animation}";
    };
    window.hidePreloader = () => {
      rules.style.animationDuration = ".3s";
      setTimeout(() => {
        rules.style.display = "none";
        rules.style.animation = "none";
      }, 300);
    };
    window.addEventListener('load', hidePreloader);
  }
  `;
  return {
    name: "preloader",
    entrypoints: { "main": main },
    render(ctx) {
      ctx.render();
      const cssText = `
        body:before {
          content: "";
          display: block;
          position: absolute;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height};
          background: ${color};
          animation: ${animation};
        }
        ${keyframes}
      `;
      return {
        scripts: [{ entrypoint: "main", state: {} }],
        styles: [{ cssText, id: "__preloader" }],
      };
    },
  };
}
