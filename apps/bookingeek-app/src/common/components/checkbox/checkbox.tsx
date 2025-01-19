import styled from "styled-components";
import CheckFullIcon from "../../icons/check-full/check-full";
import CheckEmptyIcon from "../../icons/check-empty/check-empty";

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type CheckboxProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  size?: number;
};

export default function Checkbox({ checked, onChange, size }: CheckboxProps) {
  return (
    <StyledCheckbox onClick={() => onChange(!checked)}>
      {checked ? <CheckFullIcon size={size} /> : <CheckEmptyIcon size={size} />}
    </StyledCheckbox>
  );
}
