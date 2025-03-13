import styled from "styled-components";
import ToggleOnIcon from "../icons/toggle-on/toggle-on";
import ToggleOffIcon from "../icons/toggle-off/toggle-off";

const StyledToggle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

type ToggleProps = {
  active: boolean;
  disabled?: boolean;
  onChange?: (active: boolean) => void;
};

export default function Toggle({ active, disabled, onChange }: ToggleProps) {
  return (
    <StyledToggle
      onClick={() => (onChange && !disabled ? onChange(!active) : null)}
    >
      {active ? (
        <ToggleOnIcon size={32} color="#444444" />
      ) : (
        <ToggleOffIcon size={32} color="#888888" />
      )}
    </StyledToggle>
  );
}
