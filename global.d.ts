// deno-lint-ignore-file no-unused-vars
import { JSX } from "preact";

declare module "preact" {
  namespace JSX {
    interface IntrinsicAttributes {
      lang?: string;
    }
  }
}
