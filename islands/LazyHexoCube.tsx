import { LazyHydrate } from "tailored/components/LazyHydrate.tsx";
import HexoCube from "./HexoCube.tsx";

export default function LazyHexoCube(props: Parameters<typeof HexoCube>[0]) {
  return (
    <LazyHydrate id="lazy1">
      <HexoCube {...props} />
    </LazyHydrate>
  );
}
