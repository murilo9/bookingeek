import styled from "styled-components";
import FormField from "../components/form-field/form-field";
import Button from "../components/button/button";
import SocialSignInList from "../components/social-signin-list/social-signin-list";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { SIGNIN_ROUTE } from "../../env";
import { makeRequest } from "../helpers/make-request";
import { SignInDto, BusinessSignUpResponse } from "@bookingeek/core";

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const StyledImage = styled.img`
  object-fit: cover;
  height: 240px;
  content: url("/scheduling-mobile.jpg");

  @media screen and (min-width: 1024px) {
    height: 100%;
    flex: 1;
    content: url("/scheduling.jpg");
  }
`;

const StyledSignInFormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 768px;
  padding: 0 24px 72px 24px;

  @media screen and (min-width: 1024px) {
    height: 100%;
    flex: unset;
  }
`;

const StyledLogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const StyledSignInForm = styled.form`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledSignInFormFields = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledSignUpButton = styled.span`
  display: inline-block;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledLogoImg = styled.img`
  width: 56px;
  height: 56px;
`;

const StyledLogoText = styled.h1`
  font-size: 32px;
  font-weight: 600;
`;

const StyledSignUpText = styled.p`
  text-align: center;
`;

const StyledDivider = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
  height: 9px;
  display: flex;
  justify-content: center;
`;

const StyledDividerLabel = styled.p`
  background: #ffffff;
  padding: 0px 16px;
  display: inline-block;
  font-size: 14px;
  height: 16px;
`;

const StyledErrorLabel = styled.p<{ children: string }>`
  font-size: 14px;
  color: #aa3131;
  opacity: ${(props) => (props.children ? 1 : 0)};
  content: ${(props) => props.children || "null"};
`;

/**
 * Page where business' users can sign in.
 * Render the sign in form.
 */
export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [erroMessage, setErrorMessage] = useState("");

  // Makes the sign in request and set authentication data
  const handleSignIn = async () => {
    setSigningIn(true);
    const signInDto: SignInDto = {
      email,
      password,
    };
    const signUpResponse = await makeRequest.post<
      BusinessSignUpResponse<string>
    >(SIGNIN_ROUTE, signInDto);
    if (signUpResponse.success) {
      signIn(signUpResponse.success.access_token);
      window.location.reload();
    } else {
      console.log(signUpResponse.error?.message);
    }
    setErrorMessage(signUpResponse.error?.message || "");
  };

  return (
    <StyledPageContainer>
      <StyledImage src="/scheduling.jpg" />
      <StyledSignInFormContainer>
        <StyledLogoContainer>
          <StyledLogoImg src="/logo.png" />
          <StyledLogoText>Bookingeek</StyledLogoText>
        </StyledLogoContainer>
        <StyledSignInForm>
          <StyledSignInFormFields>
            <FormField
              label="E-mail"
              placeholder="E-mail"
              value={email}
              onChange={setEmail}
              autofocus
            />
            <FormField
              label="Password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={setPassword}
              onSubmit={handleSignIn}
            />
          </StyledSignInFormFields>
          <StyledErrorLabel>{erroMessage}</StyledErrorLabel>
          <Button onClick={handleSignIn} disabled={signingIn}>
            Sign In
          </Button>
          <StyledSignUpText>
            Don't have an account?{" "}
            <StyledSignUpButton onClick={() => navigate("/signup")}>
              Sign Up
            </StyledSignUpButton>
            .
          </StyledSignUpText>
          <StyledDivider>
            <StyledDividerLabel> Sign In With</StyledDividerLabel>
          </StyledDivider>
          <SocialSignInList onClick={console.log} />
        </StyledSignInForm>
      </StyledSignInFormContainer>
    </StyledPageContainer>
  );
}
