import ColorfulLink, { ColorfulLinkProps } from "@/components/ColorfulLink.tsx";
import { useEffect, useState } from "preact/hooks";

/**
 * `props.href` must start with '/'
 */
export default function MenuLink(props: ColorfulLinkProps) {
  const [active, setActive] = useState(false);

  const listener = function () {
    const fullPath = location.pathname + location.search + location.hash;
    if (fullPath === props.href) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    listener();
    globalThis.addEventListener("popstate", listener);
    return () => {
      globalThis.removeEventListener("popstate", listener);
    };
  }, []);

  return (
    <ColorfulLink
      {...props}
      active={active}
      className="menu-link text-2xl font-bold hover:text-blue"
      onClick={() => setActive(true)}
    />
  );
}
