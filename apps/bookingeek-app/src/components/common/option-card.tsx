import styled from "styled-components";

const StyledOptionCard = styled.div<{ active?: boolean }>`
  display: flex;
  padding: 16px;
  gap: 16px;
  align-items: center;
  font-size: 14px;
  color: ${(props) => (props.active ? "#ffffff" : "inherit")};
  background: ${(props) => (props.active ? "#222222" : "none")};
  border: ${(props) =>
    props.active ? "1px solid #222222" : "1px solid #bcbcbc"};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "#222222" : "#f4f4f4")};
  }
`;

const StyledFirstText = styled.span`
  font-weight: 600;
`;

type OptionCardProps = {
  text: string;
  startSlot?: JSX.Element;
  active?: boolean;
  onClick: () => void;
};

export default function OptionCard({
  active,
  text,
  startSlot,
  onClick,
}: OptionCardProps) {
  const textArray = text.split(" ");
  const firstWord = textArray[0];
  const remainingText = text.split(firstWord).join(" ");

  return (
    <StyledOptionCard active={active} onClick={onClick}>
      {startSlot}
      <p>
        <StyledFirstText>{firstWord}</StyledFirstText> {remainingText}
      </p>
    </StyledOptionCard>
  );
}
