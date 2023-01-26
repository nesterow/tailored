import { JSX } from "preact";
import { useEffect } from "preact/hooks";

interface ClickOutsideProps {
  onClickOutside: () => void;
}

interface WithTarget {
  className?: never;
  target: string;
  children?: never;
}

interface WithChildren {
  className?: string;
  target?: never;
  children: JSX.Element;
}

type ClickOutsideProp =
  | ClickOutsideProps & WithTarget
  | ClickOutsideProps & WithChildren;

/**
 * Click outside.
 * Works with either: children or arbitrary selector using `target`
 */
export default function ClickOutside(props: ClickOutsideProp) {
  const id = `CO${Math.ceil(Math.random() * 100)}`;
  const { onClickOutside } = props;
  const target = props.target || "#" + id;

  const get = (selector: string) => {
    return document.querySelector(selector);
  };

  const listener = (e: MouseEvent) => {
    const ref = get(target);
    if (ref && !ref.contains(e.target as Node)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  if (props.target) return <>{" "}</>;

  return (
    <div id={id}>
      {props.children}
    </div>
  );
}
