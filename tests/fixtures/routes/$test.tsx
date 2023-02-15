import { PageProps } from "$fresh/server.ts";
import $TestLayout from "../components/$TestLayout.tsx";

export default function $Test({ data }: PageProps) {
  return (
    <$TestLayout>
      <span>Hello world!</span>
    </$TestLayout>
  );
}
