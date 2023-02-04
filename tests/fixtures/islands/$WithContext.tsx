import { useEffect, useRef, useState } from "preact/hooks";
import { useFetch } from "tailored/hooks.ts";

export default function $WithContext() {
  const [headers, setHeaders] = useState({});
  const _fetch = useFetch();
  const div = useRef<HTMLDivElement>(null);
  async function load() {
    await _fetch("/$headers", { headers: { "x": "1" }, credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setHeaders(data);
        div.current?.setAttribute("id", "test");
      });
  }
  useEffect(() => {
    load();
  }, []);
  return (
    <div ref={div}>
      {JSON.stringify(headers)}
    </div>
  );
}
