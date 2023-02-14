import { useMemo } from "preact/hooks";

export function useRandomId(
  opts = { prefix: "id", length: 9 },
  inputs: unknown[] = [],
) {
  return useMemo(
    () =>
      `${opts.prefix}-${Math.random().toString(36).substring(2, opts.length)}`,
    [opts, ...inputs],
  );
}
