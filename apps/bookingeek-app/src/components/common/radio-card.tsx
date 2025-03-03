import styled from "styled-components";
import RadioFullIcon from "../icons/radio-full/radio-full";
import RadioEmptyIcon from "../icons/radio-empty/radio-empty";

const StyledCard = styled.div<{ isSelected?: boolean }>`
  padding: 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid ${(props) => (props.isSelected ? "#222222" : "#bcbcbc")};
  cursor: pointer;

  &:hover {
    background: #f4f4f4;
  }
`;

const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledCardTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

type RadioCardProps = {
  title: string;
  description: string;
  isSelected?: boolean;
  onClick: () => void;
  children?: JSX.Element;
};

export default function RadioCard({
  description,
  onClick,
  title,
  isSelected,
  children,
}: RadioCardProps) {
  return (
    <StyledCard isSelected={isSelected} onClick={onClick}>
      {isSelected ? <RadioFullIcon size={20} /> : <RadioEmptyIcon size={20} />}
      <StyledCardBody>
        <StyledCardTitle>{title}</StyledCardTitle>
        <p>{description}</p>
        {children}
      </StyledCardBody>
    </StyledCard>
  );
}
