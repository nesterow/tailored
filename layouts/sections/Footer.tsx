import { apply, tw } from "twind";

const footer_style = apply`
  apear
  flex
  flex-wrap
  justify-center
  items-center
  gap-6
  w-full
  min-h-[88px]
  p-2
  pt-5
  absolute
  bottom-0
  z-50
  shadow
  bg-light
  font-thin
`;

export default function Footer() {
  return (
    <footer className={tw(footer_style)}>
      {new Date().getFullYear()} © Nesterov.Digital
    </footer>
  );
}
