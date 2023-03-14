import { JSX } from "preact";
import HelixAnimation from "@/islands/HelixAnimation.tsx";
import Header from "./sections/Header.tsx";
import Footer from "./sections/Footer.tsx";
import MenuLink from "@/islands/MenuLink.tsx";

interface PageProps {
  children: JSX.Element[] | JSX.Element;
  className?: string;
}

export default function Page(props: PageProps) {
  return (
    <>
      <Header />
      <HelixAnimation
        trigger="popstate"
        width="100%"
        className="w-full fixed -left-[0%] top-0 bottom-0 -z-50 opacity-[0.01]"
        noSSR
      />
      <div
        class="relative flex p-2 mx-auto max-w-screen-lg prose"
        className={props.className}
      >
        <div class="relative min-w-[300px] border-r-[.2em] border-[#effaff] -mt-12 pt-12">
          <div class="w-full max-w-[300px] max-h-[50vh] overflow-y-auto h-auto fixed px-6 py-2">
            <MenuLink
              className="relative text-2xl"
              href=""
              underlineHeight={6}
              underlineWidth="10%"
              style={{
                strokeOpacity: 0.5,
              }}
            >
              Home
            </MenuLink>
            <div class="px-0">
              <MenuLink
                className="relative"
                href="#education"
                underlineHeight={6}
                underlineWidth="10%"
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                Education
              </MenuLink>
              <MenuLink
                className="relative"
                href="#projects"
                underlineHeight={6}
                underlineWidth="10%"
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                Projects
              </MenuLink>
              <MenuLink
                className="relative"
                href="#current-scientific-study"
                underlineHeight={6}
                underlineWidth="10%"
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                Current Scientific Study
              </MenuLink>
              <MenuLink
                className="relative"
                href="#interested-in"
                underlineHeight={6}
                underlineWidth="10%"
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                Interested in
              </MenuLink>
              <MenuLink
                className="relative"
                href="#skills"
                underlineHeight={6}
                underlineWidth="10%"
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                Skills
              </MenuLink>
            </div>
          </div>
        </div>
        <div class="w-full relative p-6 pt-14">
          {props.children}
        </div>
      </div>
      <Footer />
    </>
  );
}
