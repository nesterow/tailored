import { useDebugValue, useId, useMemo } from "preact/hooks";

/**
 * Alias for useId with a prefix.
 */
export function usePrefixId(
  prefix = "idx",
  inputs: unknown[] = [],
) {
  const id = useMemo(
    () => prefix + useId(),
    [prefix, ...inputs],
  );
  useDebugValue("usePrefixId", () => id);
  return id;
}
