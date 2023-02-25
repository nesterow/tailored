const isDev = typeof document !== "undefined"
  ? false
  : Deno.env.get("DENO_ENV") === "development";
const logger = console;

export default (prefix: string) => {
  function proxy(callback: (...args: unknown[]) => void) {
    return (...args: unknown[]) => callback(prefix, ...args);
  }
  return {
    info: proxy(logger.info.bind(logger)),
    error: proxy(logger.error.bind(logger)),
    warn: proxy(logger.warn.bind(logger)),
    dev: isDev ? proxy(logger.info.bind(logger)) : () => {},
  };
};
