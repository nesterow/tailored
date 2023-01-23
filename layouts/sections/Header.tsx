import MenuLink from "../../islands/MenuLink.tsx"
export default function Header() {
    return (
        <header class="apear sticky shadow-sm top-0 z-50 bg-[#fffdf099] flex flex-wrap justify-center items-center gap-6 w-full p-2 pt-5 mb-10 md:mb-20 opacity-90 font-thin">            
            <MenuLink className="hover:!text-blue transition text-2xl" href="/" active>About</MenuLink>
            <MenuLink className="hover:!text-blue transition text-2xl" href="/#capabilities">Capabilities</MenuLink>
            <MenuLink className="hover:!text-blue transition text-2xl" href="/#stack">Stack</MenuLink>
            <MenuLink className="hover:!text-blue transition text-2xl" href="/#cases">Cases</MenuLink>
            <MenuLink className="hover:!text-blue transition text-2xl"href="/#contact">Hire</MenuLink>
        </header>
    );
}