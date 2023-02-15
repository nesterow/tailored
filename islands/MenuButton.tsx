import ToggleClass from "tailored/components/ToggleClass.tsx";
import type { ToggleClassProps } from "tailored/components/ToggleClass.tsx";
import { MenuIcon } from "@/components/icons.ts";

type MenuButtonProps = ToggleClassProps & {
  size?: number;
  color?: string;
  stroke?: number;
};

MenuButton.defaultProps = {
  size: 24,
  color: "black",
  stroke: 2,
} as MenuButtonProps;

export default function MenuButton(props: MenuButtonProps) {
  return (
    <ToggleClass {...props}>
      <MenuIcon size={props.size} color={props.color} stroke={props.stroke} />
    </ToggleClass>
  );
}
