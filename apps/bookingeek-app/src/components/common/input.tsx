import { InputHTMLAttributes } from "react";
import styled from "styled-components";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "children">;

type ExtraInputProps = { error?: boolean; fullwidth?: boolean };

const borderColor = {
  normal: "#BCBCBC",
  hover: "#999999",
  activeFocus: "#777777",
};

const StyledInput = styled.input<ExtraInputProps>`
  outline: none;
  height: 36px;
  padding: 0px 12px;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.error ? "#ff0000" : borderColor.normal)};
  color: #222222;
  font-size: 14px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  width: ${(props) => (props.fullwidth ? "100%" : "auto")};
  &:hover {
    border-color: ${(props) => (props.error ? "#ff0000" : borderColor.hover)};
  }
  &:active,
  &:focus {
    border-color: ${(props) =>
      props.error ? "#ff0000" : borderColor.activeFocus};
  }
`;

export default function Input(props: InputProps & ExtraInputProps) {
  return <StyledInput {...props} />;
}
