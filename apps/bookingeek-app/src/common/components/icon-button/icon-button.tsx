import styled from "styled-components";

type IconButtonProps = {
  children?: JSX.Element | string | number;
  disabled?: boolean;
  variant?: "primary" | "danger";
  onClick?: () => void;
};

const background = {
  normal: "transparent",
  hover: "rgba(0,0,0,0.05)",
  active: "rgba(0,0,0,0.1)",
};

const color = {
  primary: { normal: "#444444", disabled: "#888888" },
  danger: { normal: "#AA3131", disabled: "#F9B0B0" },
};

const StyledIconButton = styled.button<IconButtonProps>`
  font-size: 14px;
  border: none;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  padding-inline: 0px;
  cursor: ${(props) => (props.disabled ? "disabled" : "pointer")};
  background: ${background.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    color[props.variant!][props.disabled ? "disabled" : "normal"]};
  &:hover {
    background: ${(props) => background[props.disabled ? "normal" : "hover"]};
  }
  &:active {
    background: ${(props) => background[props.disabled ? "normal" : "active"]};
  }
`;

export default function IconButton(props: IconButtonProps) {
  return <StyledIconButton {...props} variant={props.variant || "primary"} />;
}
