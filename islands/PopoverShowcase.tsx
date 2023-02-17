import { useRef } from "preact/hooks";
import Popover from "tailored/components/Popover.tsx";

export default function PopoverShowcase() {
  const targetClick = useRef(null);
  const targetHover = useRef(null);
  const targetHoverTransition = useRef(null);
  const targetHoverAnimation = useRef(null);
  return (
    <>
      <a ref={targetClick}>Popover (click)</a>
      <Popover
        target={targetClick}
        className="bg-white shadow-lg rounded-lg p-4"
        trigger="click"
      >
        <div>Popover content (click)</div>
      </Popover>

      <hr />

      <a ref={targetHover}>Popover (hover)</a>
      <Popover
        target={targetHover}
        className="bg-white shadow-lg rounded-lg p-4"
        trigger="hover"
      >
        <div>Popover content (hover)</div>
      </Popover>

      <hr />

      <a ref={targetHoverTransition}>Popover (hover | transition)</a>
      <Popover
        target={targetHoverTransition}
        className="bg-white shadow-lg rounded-lg p-4 transition-all duration-200 ease-in"
        hideClassName="transition-all duration-100 ease-out"
        trigger="hover"
      >
        <div>Popover content (hover|transition)</div>
      </Popover>

      <hr />

      <a ref={targetHoverAnimation}>Popover (hover | animation)</a>
      <Popover
        target={targetHoverAnimation}
        className="bg-white shadow-lg rounded-lg p-4 appear"
        hideClassName="transition-all duration-100 ease-out"
        trigger="hover"
      >
        <div>Popover content (hover|animation)</div>
      </Popover>
    </>
  );
}
