import { ChangeEventHandler } from "react";
import styled from "styled-components";

const borderColor = {
  normal: "#BCBCBC",
  hover: "#999999",
  activeFocus: "#777777",
};

const StyledSelect = styled.select`
  outline: none;
  height: 36px;
  padding: 0px 12px;
  border-radius: 6px;
  border: 1px solid ${borderColor.normal};
  background: none;
  color: #222222;
  font-size: 14px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  &:hover {
    border-color: ${borderColor.hover};
  }
  &:active,
  &:focus {
    border-color: ${borderColor.activeFocus};
  }
`;

type SelectProps = {
  children?: JSX.Element | Array<JSX.Element>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export default function Select(props: SelectProps) {
  return <StyledSelect {...props} />;
}
