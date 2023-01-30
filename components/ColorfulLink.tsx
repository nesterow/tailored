import { JSX } from "preact";

export interface ColorfulLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  lineHeight?: number;
}
export default function ColorfulLink(props: ColorfulLinkProps) {
  return (
    <a {...props}>
      {props.children}
      <svg viewBox="0 0 10 10" width="100%" height={props.lineHeight || 8}>
        <path
          name="colors"
          d="M 0 1 L 1000 4 Z"
          fill="none"
          stroke="red"
          stroke-linecap="round"
        />
        <path
          name="colors"
          d="M -1000 1 L 0 1 Z"
          fill="none"
          stroke="green"
          stroke-linecap="round"
        />
        <path
          name="colors"
          d="M 0 6 L 1000 0 Z"
          fill="none"
          stroke="blue"
          stroke-linecap="round"
        />
        <path
          name="colors"
          d="M 0 1 L -1000 4 Z"
          fill="none"
          stroke="red"
          stroke-linecap="round"
        />
        <path
          name="colors"
          d="M 1000 1 L 0 1 Z"
          fill="none"
          stroke="green"
          stroke-linecap="round"
        />
        <path
          name="colors"
          d="M 0 6 L -1000 0 Z"
          fill="none"
          stroke="blue"
          stroke-linecap="round"
        />
      </svg>
    </a>
  );
}
