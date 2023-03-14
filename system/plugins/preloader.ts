/**
MIT License

Copyright (c) 2023 Anton Nesterov, anton@demiurg.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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

export default function preloader(
  color = "linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)",
  height = "10px",
  animation = ANIMATION,
  keyframes = KEYFRAMES,
): Plugin {
  const main = `data:application/javascript,
  export default function(_) {
    const preloader = document.getElementById("__preloader");
    const rules = preloader.sheet.rules[0];
    window.showPreloader = () => {
      rules.style.display = "block";
      rules.style.animation = "${animation}";
    };
    window.hidePreloader = () => {
      rules.style.animationDuration = ".15s";
      setTimeout(() => {
        rules.style.display = "none";
        rules.style.animation = "none";
      }, 50);
    };
    window.addEventListener('load', hidePreloader);
    window.addEventListener('beforeunload', () => {
      rules.style.animationDuration = "1s";
      showPreloader()
    });
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
