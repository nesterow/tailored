import { apply, tw } from "twind/core";

const footer_style = apply`
  appear
  flex
  flex-wrap
  justify-center
  items-center
  gap-6
  w-full
  min-h-[70px]
  p-2
  pt-5
  z-50
  shadow
  bg-light
  font-thin
  md:pb-4
`;

export default function Footer() {
  return (
    <footer className={tw(footer_style)}>
      {new Date().getFullYear()} © Nesterov.Digital
    </footer>
  );
}
