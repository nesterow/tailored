import { JSX } from "preact";

interface $Props {
  children: JSX.Element[] | JSX.Element;
}

export default function $Test(props: $Props) {
  return (
    <>
      {props.children}
    </>
  );
}
