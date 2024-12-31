import styled from "styled-components";
import IconButton from "../components/icon-button/icon-button";
import CloseIcon from "../icons/close";
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
  // Defines the form step to be rendered
  const [formStep, setFormStep] = useState(0);
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
  // ----- End of form fields -----

  // Goes to previous form step, if possible
  const onBackClick = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
    }
  };

  // Goes to next form step, if possible
  const onNextClick = (currentStep: number) => {
    if (currentStep < 9) {
      setFormStep(currentStep + 1);
    }
    // TODO: add submit flow
  };

  const handleSubmit = () => {
    if (mayGoToNextFormStep()) {
      onNextClick(formStep);
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
      case 9:
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
            onSubmit={handleSubmit}
            autofocus
          />
        );
      case 1:
        return (
          <FormField
            label="What's your business field?"
            placeholder="Type here"
            value={businessField}
            type="select"
            options={Object.entries(BUSINESS_FIELDS).map(([value, label]) => ({
              label,
              value,
            }))}
            onChange={setBusinessField}
            onSubmit={handleSubmit}
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
              onSubmit={handleSubmit}
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
              onSubmit={handleSubmit}
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
              type="radio"
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
              onSubmit={handleSubmit}
            />
            {businessDoesRefund === "yes" ? (
              <>
                <FormField<"total" | "partial">
                  label="What kind of refunds does it offer?"
                  type="radio"
                  options={Object.entries(BUSINESS_REFUND_TYPES).map(
                    ([value, label]) => ({ value, label })
                  )}
                  value={businessRefundType}
                  onChange={setBusinessRefundType}
                />
                <FormField
                  label="Add a short description of how your refunding policy works. It will be displayed to customers."
                  type="textarea"
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
            onSubmit={handleSubmit}
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
            onSubmit={handleSubmit}
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
            onSubmit={handleSubmit}
            autofocus
          />
        );
      case 9:
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
            onClick={() => onNextClick(formStep)}
            disabled={!mayGoToNextFormStep()}
          >
            {formStep === 9 ? "Submit" : "Next"}
          </Button>
        </StyledActionsContainer>
      </StyledFormContainer>
      {formStep}
    </StyledPageContainer>
  );
}
