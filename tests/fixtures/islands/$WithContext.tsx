import { useEffect, useRef, useState } from "preact/hooks";
import { useContextFetch } from "tailored/hooks/useContextFetch.ts";
import Context from "@/tests/context.ts";

export default function $WithContext() {
  const [headers, setHeaders] = useState({});
  const _fetch = useContextFetch(Context);
  const div = useRef<HTMLDivElement>(null);

  async function load() {
    await _fetch("/$headers", { headers: { "X": "1" }, credentials: "include" })
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
