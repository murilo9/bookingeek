import styled from "styled-components";
import ToggleOnIcon from "../icons/toggle-on/toggle-on";
import ToggleOffIcon from "../icons/toggle-off/toggle-off";

const StyledToggle = styled.div``;

type ToggleProps = {
  active: boolean;
  onChange?: (active: boolean) => void;
};

export default function Toggle({ active, onChange }: ToggleProps) {
  return (
    <StyledToggle onClick={() => (onChange ? onChange(!active) : null)}>
      {active ? <ToggleOnIcon /> : <ToggleOffIcon />}
    </StyledToggle>
  );
}
