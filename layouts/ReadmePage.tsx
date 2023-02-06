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
        className="w-full fixed -left-[0%] top-0 bottom-0 -z-50 opacity-5"
      />
      <div
        class="relative flex p-2 mx-auto max-w-screen-lg prose"
        className={props.className}
      >
        <div class="relative min-w-[300px]">
          <div class="w-full max-w-[300px] max-h-[50vh] overflow-y-auto h-auto fixed">
            <MenuLink
              className="relative text-2xl"
              href=""
              lineHeight={3}
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
                lineHeight={3}
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                - Education
              </MenuLink>
              <MenuLink
                className="relative"
                href="#projects"
                lineHeight={3}
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                - Projects
              </MenuLink>
              <MenuLink
                className="relative"
                href="#current-scientific-study"
                lineHeight={3}
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                - Current Scientific Study
              </MenuLink>
              <MenuLink
                className="relative"
                href="#interested-in"
                lineHeight={3}
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                - Interested in
              </MenuLink>
              <MenuLink
                className="relative"
                href="#skills"
                lineHeight={3}
                style={{
                  strokeOpacity: 0.5,
                }}
              >
                - Skills
              </MenuLink>
            </div>
          </div>
        </div>
        <div class="w-full p-6 mt-64">
          {props.children}
        </div>
      </div>
      <Footer />
    </>
  );
}
