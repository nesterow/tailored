import { useEffect, useState } from "preact/hooks";

interface HexoCubeProps {
  width?: number | string;
  height?: number | string;
  play?: boolean;
  title?: string;
  className?: string;
}
/**
 * Hexagons form a 3d cube.
 * I wanted to make it in a 80s style, but now it is what it is.
 * The effect is achieved by opace hexagons overlapping each other.
 *
 * Now this is the logo for `nesterov.digital` website.
 */
export default function HexoCube(props: HexoCubeProps) {
  const [hexagons, setHexagons] = useState<number[][]>(renderHexagons(30));
  const [hexagon, setHexagon] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  //const refs = new Array(6).fill(0).map(() => useRef<SVGPolygonElement>(null))

  useEffect(() => {
    play();
  }, [props.play]);

  function play() {
    if (!props.play) {
      setHexagons(renderHexagons(20, 6));
      setHexagon(renderCenter(20));
      return;
    }
    if (isPlaying) {
      return;
    }
    setHexagon([]);
    setIsPlaying(true);
    function animate(distance: number) {
      if (distance < 20) {
        setHexagons(renderHexagons(20, 6));
        return;
      }
      setHexagons(renderHexagons(distance, 6));
      setTimeout(() => {
        animate(distance - 1);
      }, 1000 / distance);
    }
    animate(40);
    setTimeout(() => {
      setHexagon(renderCenter(20));
      setIsPlaying(false);
    }, 800);
  }

  function renderCenter(radius: number) {
    const hexagon: number[] = [];
    for (let x = 0; x < 6; x++) {
      hexagon.push(50 + radius * Math.cos(x * 2 * Math.PI / 6));
      hexagon.push(50 + radius * Math.sin(x * 2 * Math.PI / 6));
    }
    return hexagon;
  }

  function renderHexagons(distance: number, n = 3) {
    const hexagons: number[][] = [];
    const hexagon = renderCenter(20);
    for (let x = 0; x < 6; x++) {
      hexagons.push(hexagon.map((y, i) => {
        if (i % 2 === 0) {
          return y + distance * Math.cos(x * 2 * Math.PI / n);
        } else {
          return y + distance * Math.sin(x * 2 * Math.PI / n);
        }
      }));
    }
    return hexagons;
  }

  return (
    <section
      class="flex flex-col items-center"
      className={props.className}
      onClick={play}
    >
      <svg width={props.width} height={props.height} viewBox="0 0 100 100">
        <defs>
        </defs>
        <g transform="rotate(90, 50, 50)">
          {hexagons.map((polygon, i) => (
            <polygon
              // ref={refs[i]}
              points={polygon.join(",")}
              style="opacity:0.4;"
              fill={`hsl(${i * 120}, 100%, 50%)`}
              stroke="none"
              transform="rotate(60,50,50)"
            />
          ))}
          <polygon
            points={hexagon.join(",")}
            fill="none"
            stroke="white"
            transform="rotate(0,50,50)"
            stroke-width="1.5"
          />
        </g>
        <text x="15.6" style="opacity:0.6;">
          {props.title?.split("").map((char, i) => (
            <tspan
              dx="0.09"
              y="97"
              text-anchor="middle"
              alignment-baseline="middle"
              font-size="8"
              font-family="mono,monospace,courier"
              fill={i < Math.ceil((props.title?.length || 0) / 2)
                ? "blue"
                : "red"}
            >
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </section>
  );
}
