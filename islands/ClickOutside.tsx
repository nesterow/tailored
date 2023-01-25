import { useEffect } from "preact/hooks";

interface ClickOutsideProps
  extends Record<string, string | number | (() => void)> {
  target: string;
  onClickOutside: () => void;
}

export default function ClickOutside(props: ClickOutsideProps) {
  const { target, onClickOutside } = props;

  const get = (selector: string) => document.querySelector(selector);

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

  return <>{" "}</>; // hydration issue;
}
