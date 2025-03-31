import { ChangeEventHandler } from "react";
import styled from "styled-components";

const borderColor = {
  normal: "#BCBCBC",
  hover: "#999999",
  activeFocus: "#777777",
};

const StyledSelect = styled.select<{ error?: boolean }>`
  outline: none;
  height: 36px;
  padding: 0px 12px;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.error ? "#ff0000" : borderColor.normal)};
  background: none;
  color: ${(props) => (props.value ? "#222222" : "#666666")};
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  &:hover {
    border-color: ${(props) => (props.error ? "#ff0000" : borderColor.hover)};
  }
  &:active,
  &:focus {
    border-color: ${(props) =>
      props.error ? "#ff0000" : borderColor.activeFocus};
  }
`;

type SelectProps = {
  children?: JSX.Element | Array<JSX.Element>;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export default function Select(props: SelectProps & { error?: boolean }) {
  return <StyledSelect {...props} />;
}
