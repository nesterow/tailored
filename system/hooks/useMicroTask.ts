export function useMicroTask(cb: (...args: unknown[]) => void) {
  return (...args: unknown[]) => {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(() => cb(...args));
    } else {
      Promise.resolve()
        .then(() => cb(...args))
        .catch((e) =>
          setTimeout(() => {
            throw e;
          })
        );
    }
  };
}
