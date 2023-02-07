import { JSX } from "preact";

export interface ColorfulLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  underlineHeight?: number | string;
  underlineWidth?: number | string;
  className?: string;
  colors?: string[];
}

ColorfulLink.defaultProps = {
  colors: ["red", "blue", "green"],
  underlineHeight: 8,
  underlineWidth: "100%",
} as ColorfulLinkProps;

export default function ColorfulLink(props: ColorfulLinkProps) {
  return (
    <a {...props}>
      {props.children}
      <svg
        viewBox="0 0 10 10"
        style={{
          width: "100%",
          maxWidth: props.underlineWidth,
        }}
        height={props.underlineHeight}
      >
        {props.colors?.map((color, i) => (
          <line
            x1="-1000"
            y1={i * 3}
            x2="1000"
            y2={i * 3}
            fill="none"
            stroke={color}
          />
        ))}
      </svg>
    </a>
  );
}
