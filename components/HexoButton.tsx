import { JSX } from "preact";
import { useState } from "preact/hooks";

const hexagon: number[] = [];
for (let x = 0; x < 6; x++) {
  hexagon.push(50 + 50 * Math.cos(x * 2 * Math.PI / 6));
  hexagon.push(50 + 50 * Math.sin(x * 2 * Math.PI / 6));
}

interface HexoButtonProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  width: string;
  rotate?: number;
  mainColor?: string;
  hoverColor?: string;
  strokeColor?: string;
}

const Styles = (
  props: HexoButtonProps,
  extend?: { [key: string]: string },
) => ({
  width: props.width,
  "--main-color": props.mainColor || "var(--xbtn-main-color, #bbb)",
  "--hover-color": props.hoverColor || "var(--xbtn-main-dark, #333)",
  "--stroke-color": props.strokeColor || "var(--xbtn-stroke-color, red)",
  ...extend,
});

export default function HexoButton(props: HexoButtonProps) {
  return (
    <a
      {...props}
      class="relative min-w-[50px] min-h-[50px]"
      style={Styles(props)}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        class="-z-10"
        style={{
          transform: `rotate(${props.rotate || 0}deg)`,
        }}
      >
        <polygon
          id="svg-hex"
          points={hexagon.join(" ")}
          style={{
            transition: "all 0.2s",
          }}
        />
      </svg>
      <span class="pointer-events-none absolute flex justify-center items-center top-0 bottom-0 right-0 left-0 p-2 m-2 text-white font-bold">
        {props.children}
      </span>
    </a>
  );
}
