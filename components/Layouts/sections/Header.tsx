import Menu from "./Menu.tsx";
export default function Header() {
  return (
    <header
      data-site-header
      class="bg-light md:sticky shadow-md top-0 z-50 flex flex-wrap justify-center items-center gap-6 w-full p-2 pt-5 mb-10 font-thin"
    >
      <Menu />
    </header>
  );
}
