import styled from "styled-components";

const StyledOptionButton = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000000;
  color: ${(props) => (props.selected ? "#ffffff" : "inherit")};
  background: ${(props) => (props.selected ? "#000000" : "none")};
  border-radius: 6px;
  cursor: pointer;
`;

type OptionButtonProps = {
  children: JSX.Element | string;
  selected: boolean;
  onClick: () => void;
};

export default function OptionButton({
  selected,
  children,
  onClick,
}: OptionButtonProps) {
  return (
    <StyledOptionButton selected={selected} onClick={onClick}>
      {children}
    </StyledOptionButton>
  );
}
