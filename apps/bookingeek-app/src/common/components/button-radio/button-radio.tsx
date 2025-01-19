import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: auto;
  }
`;

const StyledButton = styled.p<{
  isFirst?: boolean;
  isLast?: boolean;
  isSelected?: boolean;
}>`
  flex: 1;
  border: 1px solid #bcbcbc;
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 40px;
  cursor: pointer;
  justify-content: center;
  font-weight: 600;
  border-radius: ${(props) =>
    props.isFirst ? "6px 0 0 6px" : props.isLast ? "0 6px 6px 0" : "0"};
  border-left: ${(props) => (props.isFirst ? null : "none")};
  background: ${(props) => (props.isSelected ? "#000000" : "none")};
  color: ${(props) => (props.isSelected ? "#ffffff" : "inherit")};

  @media screen and (min-width: 768px) {
    flex: unset;
  }
`;

type ButtonRadioProps<T> = {
  options: Array<{ label: string; value: T }>;
  value: string;
  onChange: (value: T) => void;
};

export default function ButtonRadio<T>({
  onChange,
  options,
  value,
}: ButtonRadioProps<T>) {
  return (
    <StyledContainer>
      {options.map(({ label, value: _value }, index) => (
        <StyledButton
          isFirst={index === 0}
          isLast={index === options.length - 1}
          isSelected={value === _value}
          onClick={() => onChange(_value)}
        >
          {label}
        </StyledButton>
      ))}
    </StyledContainer>
  );
}
