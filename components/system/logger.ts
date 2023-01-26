import Logger from "https://deno.land/x/logger@v1.0.2/logger.ts";

const LOGGER_FILE_DIR = Deno.env.get("LOGGER_FILE_DIR");
const LOGGER_DISABLE_CONSOLE = Deno.env.get("LOGGER_DISABLE_CONSOLE") === "1";
const logger = new Logger();

if (LOGGER_DISABLE_CONSOLE) logger.disableConsole();
if (LOGGER_FILE_DIR) {
  await logger.initFileLogger(LOGGER_FILE_DIR);
}

export default (prefix: string) => {
  function proxy(callback: (...args: unknown[]) => void) {
    return (...args: unknown[]) => callback(prefix, ...args);
  }
  return {
    info: proxy(logger.info.bind(logger)),
    error: proxy(logger.error.bind(logger)),
    warn: proxy(logger.warn.bind(logger)),
  };
};