import Menu from "./Menu.tsx";
export default function Header() {
  return (
    <header
      data-site-header
      class="apear sticky shadow-sm top-0 z-50 bg-light flex flex-wrap justify-center items-center gap-6 w-full p-2 pt-5 mb-10 opacity-90 font-thin"
    >
      <Menu />
    </header>
  );
}
