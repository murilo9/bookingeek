import styled from "styled-components";
import IconButton from "../components/icon-button/icon-button";
import CloseIcon from "../icons/close/close";
import Button from "../components/button/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import FormField from "../components/form-field/form-field";
import { FormFieldLabel } from "../components/form-field/form-field-label";
import OptionCard from "../components/option-card/option-card";
import SignUpOverview from "../components/sign-up-overview/sign-up-overview";
import {
  BusinessResourcesType,
  BUSINESS_RESOURCE_TYPES,
} from "../../businesses/types/business-resource-type";
import {
  BUSINESS_FIELDS,
  BusinessField,
} from "../../businesses/types/business-fields";
import {
  BUSINESS_REFUND_TYPES,
  BusinessRefundType,
} from "../../businesses/types/business-refund-type";
import { BusinessSignUpDto } from "@bookingeek/api/src/businesses/dto";
import { BASE_URL_DEV, SIGNUP_ROUTE } from "../../env";
import { useAuth } from "../hooks/useAuth";

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
  max-width: 768px;
  margin: auto;
  background: #ffffff;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 24px 24px;
`;

const StyledTitleText = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const StyledFormContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 32px 0 16px 0;
  gap: 8px;
`;

const StyledCustomFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledOptionCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type SignUpStages = "businessData" | "personalData" | "overview";

const STAGE_NAMES: Record<SignUpStages, string> = {
  businessData: "Let's get to know your business",
  personalData: "Now tell us about you",
  overview: "Review your information",
};

/**
 * Page where users can do the business sign up.
 * Renders a sequence of forms steps.
 */
export default function SignUpPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  // Defines the form step to be rendered
  const [formStep, setFormStep] = useState(0);
  // Fetching state of sign up request
  const [signingUp, setSigningUp] = useState(false);
  // ----- Form fields -----
  const [businessName, setBusinessName] = useState("Joe's Barber");
  const [businessField, setBusinessField] = useState<BusinessField>(
    "beauty-and-wellbeing"
  );
  const [businessAddress, setBusinessAddress] = useState("47 St, 358, Boston");
  const [businessPhone, setBusinessPhone] = useState("6171169845");
  const [businessDoesRefund, setBusinessDoesRefund] = useState<"yes" | "no">(
    "yes"
  );
  const [businessRefundType, setBusinessRefundType] =
    useState<BusinessRefundType>("total");
  const [refundDescription, setRefundDescription] = useState("");
  const [businessResourcesType, setBusinessResourcesType] =
    useState<BusinessResourcesType>("services");
  const [businessSlug, setBusinessSlug] = useState("joes-barber");
  const [userFullName, setUserFullName] = useState("Joe Smith");
  const [userEmail, setUserEmail] = useState("joe.smith@email.com");
  const [userPassword, setUserPassword] = useState("joesmith#321");
  const [userPasswordRepeat, setUserPasswordRepeat] = useState("joesmith#321");
  // ----- End of form fields -----

  // Goes to previous form step, if possible
  const onBackClick = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
    }
  };

  // Goes to next form step, if possible
  const onNextClick = (currentStep: number) => {
    if (currentStep < 10) {
      setFormStep(currentStep + 1);
    }
    // TODO: add submit flow
  };

  // Handles Enter key press in a form step
  const handleStepSubmit = () => {
    if (mayGoToNextFormStep()) {
      onNextClick(formStep);
    }
  };

  // Makes the sign up request
  const handleSignUp = async () => {
    setSigningUp(true);
    try {
      const signUpDto: BusinessSignUpDto = {
        adminUserEmail: userEmail,
        adminUserFullName: userFullName,
        adminUserPassword: userPassword,
        businessAddress,
        businessField,
        businessName,
        businessPhoneNumber: businessPhone,
        businessResourcesType: businessResourcesType,
        businessSlug,
        doesRefund: businessDoesRefund === "yes",
        refundDescription,
        refundType: businessRefundType,
      };
      const signUpResponse = await fetch(`${BASE_URL_DEV}${SIGNUP_ROUTE}`, {
        method: "POST",
        body: JSON.stringify(signUpDto),
        headers: { "Content-Type": "application/json" },
      });
      const res: { access_token: string /*, user: User*/ } =
        await signUpResponse.json();
      signIn(res.access_token);
      window.location.reload();
    } catch (error) {
      // TODO: handle error
      console.log(error);
      setSigningUp(false);
    }
  };

  // Checks if it possible to go to next form step, based on current step's needs
  const mayGoToNextFormStep = (): boolean => {
    switch (formStep) {
      case 0: // Business name
        return businessName.trim().length >= 3;
      case 1: // Business field
        return Boolean(businessField);
      case 2: // Business address
      case 3: // Business phone number
      case 4: // Business refunding
      case 5: // Business resources type
        return true;
      case 6: // Business slug
        // TODO: add API call to check for existing business slug
        return businessSlug.trim().length >= 3;
      case 7: // User full name
        return userFullName.length >= 3;
      case 8: // User email
        // TODO: add regex to validate email
        return userEmail.length >= 5;
      case 9: // User password
        return userPassword.length >= 8 && userPassword === userPasswordRepeat;
      case 10: // Overview
        return true;
      default: // Will never fall here
        return false;
    }
  };

  const renderCurrentFormStep = () => {
    switch (formStep) {
      case 0:
        return (
          <FormField
            label="What's your business name?"
            placeholder="Type here"
            value={businessName}
            onChange={setBusinessName}
            onSubmit={handleStepSubmit}
            autofocus
          />
        );
      case 1:
        return (
          <FormField
            label="What's your business field?"
            placeholder="Type here"
            value={businessField}
            type="options-select"
            options={Object.entries(BUSINESS_FIELDS).map(([value, label]) => ({
              label,
              value,
            }))}
            onChange={setBusinessField}
            onSubmit={handleStepSubmit}
            autofocus
          />
        );
      case 2:
        return (
          <>
            <FormField
              label="What's your business address?"
              placeholder="Type here"
              helperText="Lave blank if your business does not have a physical address."
              value={businessAddress}
              onChange={setBusinessAddress}
              onSubmit={handleStepSubmit}
              autofocus
            />
          </>
        );
      case 3:
        return (
          <>
            <FormField
              label="What's your business phone number?"
              placeholder="Type here"
              helperText="Lave blank if your business does not have a phone number."
              value={businessPhone}
              onChange={setBusinessPhone}
              onSubmit={handleStepSubmit}
              autofocus
            />
          </>
        );
      case 4:
        return (
          <StyledCustomFormContainer>
            <FormField<"yes" | "no">
              label="Does your business offer refunds for cancelled reservations?"
              value={businessDoesRefund}
              type="options-radio"
              options={[
                {
                  label: "Yes",
                  value: "yes",
                },
                {
                  label: "No",
                  value: "no",
                },
              ]}
              onChange={setBusinessDoesRefund}
              onSubmit={handleStepSubmit}
            />
            {businessDoesRefund === "yes" ? (
              <>
                <FormField<"total" | "partial">
                  label="What kind of refunds does it offer?"
                  type="options-radio"
                  options={Object.entries(BUSINESS_REFUND_TYPES).map(
                    ([value, label]) => ({ value, label })
                  )}
                  value={businessRefundType}
                  onChange={setBusinessRefundType}
                />
                <FormField
                  label="Add a short description of how your refunding policy works. It will be displayed to customers."
                  type="text-long"
                  placeholder="Type here"
                  value={refundDescription}
                  onChange={setRefundDescription}
                />
              </>
            ) : null}
          </StyledCustomFormContainer>
        );
      case 5:
        return (
          <StyledOptionCardsContainer>
            <FormFieldLabel>What best describes what you offer?</FormFieldLabel>
            {Object.entries(BUSINESS_RESOURCE_TYPES).map(
              ([value, description]) => (
                <OptionCard
                  text={description}
                  key={value}
                  active={businessResourcesType === value}
                  onClick={() =>
                    setBusinessResourcesType(value as BusinessResourcesType)
                  }
                />
              )
            )}
          </StyledOptionCardsContainer>
        );
      case 6:
        return (
          <FormField
            label="Choose a slug for your business"
            placeholder="Type here"
            helperText="It will be used in URLs and may resemble to your business' name."
            value={businessSlug}
            onChange={setBusinessSlug}
            onSubmit={handleStepSubmit}
            autofocus
          />
        );
      case 7:
        return (
          <FormField
            label="What is your full name?"
            placeholder="Type here"
            value={userFullName}
            onChange={setUserFullName}
            onSubmit={handleStepSubmit}
            autofocus
          />
        );
      case 8:
        return (
          <FormField
            label="What is your e-mail address?"
            placeholder="Type here"
            value={userEmail}
            onChange={setUserEmail}
            onSubmit={handleStepSubmit}
            autofocus
          />
        );
      case 9:
        return (
          <StyledCustomFormContainer>
            <FormField
              label="Define a paswword"
              placeholder="Password"
              type="password"
              value={userPassword}
              onChange={setUserPassword}
              autofocus
            />
            <FormField
              label="Repeat paswword"
              placeholder="Password"
              type="password"
              value={userPasswordRepeat}
              onChange={setUserPasswordRepeat}
              onSubmit={handleStepSubmit}
            />
          </StyledCustomFormContainer>
        );
      case 10:
        return (
          <SignUpOverview
            {...{
              businessAddress,
              businessDoesRefund,
              businessField,
              businessName,
              businessPhone,
              businessRefundType,
              businessResourcesType,
              businessSlug,
              refundDescription,
              userEmail,
              userFullName,
            }}
          />
        );
    }
  };

  return (
    <StyledPageContainer>
      <StyledHeader>
        <StyledTitleText>{STAGE_NAMES["businessData"]}</StyledTitleText>
        <IconButton onClick={() => navigate("/")}>
          <CloseIcon />
        </IconButton>
      </StyledHeader>
      <StyledFormContainer>
        {renderCurrentFormStep()}
        <StyledActionsContainer>
          {formStep !== 0 ? (
            <Button variant="secondary" onClick={onBackClick}>
              Back
            </Button>
          ) : null}
          <Button
            onClick={() =>
              formStep === 10 ? handleSignUp() : onNextClick(formStep)
            }
            disabled={!mayGoToNextFormStep() || signingUp}
          >
            {formStep === 10 ? "Submit" : "Next"}
          </Button>
        </StyledActionsContainer>
      </StyledFormContainer>
    </StyledPageContainer>
  );
}
