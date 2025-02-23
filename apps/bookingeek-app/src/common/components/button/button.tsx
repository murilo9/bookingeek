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
  warning: {
    normal: "#AA7131",
    hover: "#A76A2C",
    active: "#885918",
    disabled: "#A76A2C",
  },
};

const color = {
  primary: { normal: "#FFFFFF", disabled: "#AAAAAA" },
  secondary: { normal: "#222222", disabled: "#666666" },
  danger: { normal: "#FFFFFF", disabled: "#EAB7B7" },
  warning: { normal: "#FFFFFF", disabled: "#EAD8B7" },
};

type ButtonProps = {
  children?: JSX.Element | string | number;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "warning";
  startSlot?: JSX.Element;
  endSlot?: JSX.Element;
  onClick?: () => void;
};

const StyledButton = styled.button<ButtonProps>`
  font-size: 14px;
  font-weight: 600;
  border: none;
  height: 40px;
  padding: 0 20px;
  border-radius: 6px;
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

const StyledStartSlot = styled.div`
  display: flex;
`;

const StyledEndSlot = styled.div`
  display: flex;
`;

const StyledTextSlot = styled.span``;

export default function Button(props: ButtonProps) {
  return (
    <StyledButton {...props} variant={props.variant || "primary"}>
      <>
        {props.startSlot ? (
          <StyledStartSlot>{props.startSlot}</StyledStartSlot>
        ) : null}
        <StyledTextSlot>{props.children}</StyledTextSlot>
        {props.endSlot ? <StyledEndSlot>{props.endSlot}</StyledEndSlot> : null}
      </>
    </StyledButton>
  );
}
