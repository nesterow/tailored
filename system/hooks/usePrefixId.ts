import { useId, useMemo } from "preact/hooks";

/**
 * Alias for useId with a prefix.
 */
export function usePrefixId(
  prefix = "idx",
  inputs: unknown[] = [],
) {
  return useMemo(
    () => prefix + useId(),
    [prefix, ...inputs],
  );
}