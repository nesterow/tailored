import { useRef } from "preact/hooks";
import Popover from "tailored/components/Popover.tsx";

export default function PopoverShowcase() {
  const target = useRef(null);
  return (
    <>
      <a ref={target}>Popover</a>
      <Popover
        target={target}
        className="bg-white shadow-lg rounded-lg p-4"
        trigger="click"
      >
        <div>Popover content</div>
      </Popover>
    </>
  );
}
