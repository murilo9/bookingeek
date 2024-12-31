import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const borderColor = {
  normal: "#BCBCBC",
  hover: "#999999",
  activeFocus: "#777777",
};

const StyledTextarea = styled.textarea`
  outline: none;
  height: 36px;
  padding: 16px 12px;
  border-radius: 6px;
  border: 1px solid ${borderColor.normal};
  color: #222222;
  font-size: 14px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 80px;
  &:hover {
    border-color: ${borderColor.hover};
  }
  &:active,
  &:focus {
    border-color: ${borderColor.activeFocus};
  }
`;

type TextareaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, "children">;

export default function Textarea(props: TextareaProps) {
  return <StyledTextarea {...props} />;
}
