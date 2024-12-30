import styled from "styled-components";

const StyledLogosContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const StyledSocialLogo = styled.img`
  width: 48px;
  height: 48px;
  padding: 8px;
  cursor: pointer;
`;

type SocialSignInListProps = {
  onClick: (provider: "google" | "facebook") => void;
};

export default function SocialSignInList({ onClick }: SocialSignInListProps) {
  return (
    <StyledLogosContainer>
      <StyledSocialLogo
        src="/facebook-logo.png"
        onClick={() => onClick("facebook")}
      />
      <StyledSocialLogo
        src="/google-logo.png"
        onClick={() => onClick("google")}
      />
    </StyledLogosContainer>
  );
}
