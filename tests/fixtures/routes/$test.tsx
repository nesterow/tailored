import { PageProps } from "$fresh/server.ts";
import $TestLayout from "../layouts/$Test.tsx";

export default function $Test({ data }: PageProps) {
  return (
    <$TestLayout>
      <span>Hello world!</span>
    </$TestLayout>
  );
}
