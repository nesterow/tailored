import { useEffect } from "preact/hooks";
import { JSX } from "preact";

interface RandomActivateProps {
  selector: string;
  activateClass: string;
  delay: number;
}

/**
 * Given a set of html elements, randomly activate them one by one with a delay.
 * Take "blinking stars" as an example.
 * Dispatch "activate" and "deactivate" events to the activated element.
 */
export default function RandomActivate(props: RandomActivateProps) {
  useEffect(() => {
    let elements = document.querySelectorAll(props.selector);
    let current = 0;
    const interval = setInterval(() => {
      if (elements.length === 0) {
        elements = document.querySelectorAll(props.selector);
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
  return <>{" "}</>;
}
