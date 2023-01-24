import { JSX } from "preact";
import HelixAnimation from "@/islands/HelixAnimation.tsx";
import Header from "./sections/Header.tsx";
import Footer from "./sections/Footer.tsx";

interface PageProps {
  children: JSX.Element[] | JSX.Element;
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
      <div class="relative p-2 mx-auto max-w-screen-lg">
        <div class="my-6">
          {props.children}
        </div>
      </div>
      <Footer />
    </>
  );
}
