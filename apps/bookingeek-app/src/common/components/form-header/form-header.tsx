import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledContent = styled.div`
  background: #ffffff;
  padding: 0 8px;
`;

const StyledHR = styled.div`
  border-bottom: 1px solid #cccccc;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  z-index: -1;
`;

type FormHeaderProps = {
  children: JSX.Element | string | string[] | null;
};

export default function FormHeader({ children }: FormHeaderProps) {
  return (
    <StyledContainer>
      <StyledHR />
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
}
