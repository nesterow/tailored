// deno-lint-ignore-file no-window-prefix
import { useEffect, useState } from "preact/hooks";

interface HelixAnimationProps {
  width?: number | string;
  className?: string;
  repeat?: boolean | number;
  trigger?: "popstate";
  transitionTime?: string; // coma separated values for three nodes, default: 13.5s,14.9s,13.3s
  colors?: string; // coma separated values for three nodes, default: red,green,blue
}

const SPEED_FACTOR = 0.3; // how fast the lines form a helix x <= 4

/**
 * Messed up lines form a helix spiral over time. SVG + CSS transition.
 * use/extend `trigger` prop to start the animation on some event.
 *
 * In fact, svg is better without animation.
 * Indefinete animation is actually CPU intensive, so use `repeat` prop wisely. Incrementing `delta` by smaller factor will make it run longer.
 * A way to do a little optimization on cpu usage is to clear the loop when the user switched tab.
 *
 * If you want to bend text look at the PolarText component to get the idea.
 */
export default function HelixAnimation(props: HelixAnimationProps) {
  const [path, setPath] = useState(getPath(0.4));
  const transitionTime = (props.transitionTime || "13.5s,14.9s,13.3s").split(
    ",",
  );
  const colors = (props.colors || "red,green,blue").split(",");

  useEffect(() => {
    setPath(getPath(Math.random() * 10));
    let delta = 1.0;
    let repeat = props.repeat;
    let timeout: number | undefined;

    function increment() {
      delta += SPEED_FACTOR;
      if (delta >= 5.0) {
        if (Number.isInteger(repeat)) {
          repeat = (repeat as number) - 1;
        }
        delta = 1.0;
      }
      setPath(getPath(delta));
    }

    function loop() {
      if (document.hidden) {
        return setTimeout(loop, 300);
      }
      increment();
      if (!repeat) return;
      timeout = setTimeout(loop, 12000);
    }

    if (props.trigger) {
      window.addEventListener(props.trigger, increment);
    } else {
      loop();
    }

    return () => {
      if (typeof timeout === "number") clearTimeout(timeout);
      if (props.trigger) window.removeEventListener(props.trigger, increment);
    };
  }, []);

  function getPath(delta1: number) {
    const path: string[] = [];
    for (let t = 0; t <= 34 * Math.PI; t += 0.1) {
      const x = -Math.cos(t) * 100 + 50;
      const y = Math.sin(t / delta1 - 1) * 50 + t * 1.4;
      if (t === 0) {
        path.push(`M ${x}, ${y}`);
      } else {
        path.push(`L ${x}, ${y}`);
      }
    }
    return path.join(" ");
  }

  return (
    <div
      className={props.className}
      style={{
        filter: "blur(1px)",
      }}
    >
      <svg viewBox="0 0 100 126" width={props.width} height="100%">
        <g>
          <path
            style={{ transition: transitionTime[0] }}
            d={path}
            fill="none"
            stroke={colors[0]}
            stroke-width=".1"
            stroke-linecap="round"
          />
          <path
            style={{ transition: transitionTime[1] }}
            d={path}
            fill="none"
            stroke={colors[1]}
            stroke-width=".1"
            stroke-linecap="round"
          />
          <path
            style={{ transition: transitionTime[2] }}
            d={path}
            fill="none"
            stroke={colors[2]}
            stroke-width=".1"
            stroke-linecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
