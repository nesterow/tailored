import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact";

interface RandomActivateProps {
  activateClass: string;
  delay: number;
  className?: string;
}

interface WithChildren {
  children: JSX.Element | JSX.Element[];
  target?: never;
}

interface WithTarget {
  target: string;
  children?: JSX.Element | JSX.Element[];
}

type RandomActivateProp = RandomActivateProps & (WithChildren | WithTarget);

/**
 * Given a set of html elements, randomly activate them one by one with a delay. Take "blinking stars" as an example.
 * Dispatch "activate" and "deactivate" events to the activated element.
 * Works with either `children` or `target` selector.
 */
export default function RandomActivate(props: RandomActivateProp) {
  const ref = useRef<HTMLDivElement>(null);
  const select = () =>
    (!props.children && props.target
      ? document.querySelectorAll(props.target)
      : !props.target
      ? ref.current?.children
      : ref.current?.querySelectorAll(props.target)) || [];
  useEffect(() => {
    let elements = select();
    let current = 0;
    const interval = setInterval(() => {
      if (elements?.length === 0) {
        elements = select();
        return;
      }
      let index = current;
      while (true) {
        index = Math.floor(Math.random() * elements.length);
        if (index !== current) {
          current = index;
          break;
        }
      }
      const element = elements[index];
      element.classList.add(props.activateClass);
      element.dispatchEvent(new CustomEvent("activate"));
      setTimeout(() => {
        element.classList.remove(props.activateClass);
        element.dispatchEvent(new CustomEvent("deactivate"));
      }, props.delay);
    }, props.delay);
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (!props.children) return <>{" "}</>; // hydration issue
  return (
    <div ref={ref} className={props.className}>
      {props.children}
    </div>
  );
}
