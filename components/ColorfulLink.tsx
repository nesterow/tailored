import { JSX } from "preact";

export interface ColorfulLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}
export default function ColorfulLink(props: ColorfulLinkProps) {
  return (
    <a {...props} class="relative text-2xl text-[#333] font-normal font-sans">
      {props.children}
      <svg viewBox="0 0 10 10" width="100%" height="15">
        <path
          name="colors"
          d="M -100 0 L 100 4 Z"
          fill="none"
          stroke="red"
          stroke-linecap="round"
        />
        <path
          name="colors"
          d="M -100 1 L 100 1 Z"
          fill="none"
          stroke="green"
          stroke-linecap="round"
        />
        <path
          name="colors"
          d="M -100 6 L 100 0 Z"
          fill="none"
          stroke="blue"
          stroke-linecap="round"
        />
      </svg>
    </a>
  );
}
