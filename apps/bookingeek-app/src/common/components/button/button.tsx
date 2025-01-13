import styled from "styled-components";

const background = {
  primary: {
    normal: "#000000",
    hover: "#161616",
    active: "#282828",
    disabled: "#262626",
  },
  secondary: {
    normal: "#E8E8E8",
    hover: "#D8D8D8",
    active: "#CCCCCC",
    disabled: "#DDDDDD",
  },
  danger: {
    normal: "#aa3131",
    hover: "#9B2727",
    active: "#881818",
    disabled: "#9B2727",
  },
};

const color = {
  primary: { normal: "#FFFFFF", disabled: "#AAAAAA" },
  secondary: { normal: "#222222", disabled: "#666666" },
  danger: { normal: "#FFFFFF", disabled: "#EAB7B7" },
};

type ButtonProps = {
  children?: JSX.Element | string | number;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
};

const StyledButton = styled.button<ButtonProps>`
  font-size: 14px;
  border: none;
  height: 40px;
  padding: 0 20px;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "disabled" : "pointer")};
  background: ${(props) =>
    props.disabled
      ? background[props.variant!].disabled
      : background[props.variant!].normal};
  color: ${(props) =>
    color[props.variant!][props.disabled ? "disabled" : "normal"]};
  &:hover {
    background: ${(props) =>
      background[props.variant!][props.disabled ? "disabled" : "hover"]};
  }
  &:active {
    background: ${(props) =>
      background[props.variant!][props.disabled ? "disabled" : "active"]};
  }
`;

export default function Button(props: ButtonProps) {
  return <StyledButton {...props} variant={props.variant || "primary"} />;
}
