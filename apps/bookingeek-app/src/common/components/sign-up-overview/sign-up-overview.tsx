import styled from "styled-components";
import {
  BusinessResourcesType,
  BUSINESS_RESOURCE_TYPES,
} from "../../../businesses/types/business-resource-type";
import { BUSINESS_REFUND_TYPES } from "../../../businesses/types/business-refund-type";
import { BUSINESS_FIELDS } from "../../../businesses/types/business-fields";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 14px;
  overflow-y: auto;
  padding: 16px 0;
`;

const StyledLabel = styled.p`
  font-weight: 600;
`;

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DATA_DICTIONARY = {
  yes: "Yes",
  no: "No",
  ...BUSINESS_REFUND_TYPES,
  ...BUSINESS_FIELDS,
  ...BUSINESS_RESOURCE_TYPES,
};

type SignUpOverviewProps = {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessField: string;
  businessDoesRefund: "yes" | "no";
  businessRefundType: "total" | "partial";
  refundDescription: string;
  businessResourcesType: BusinessResourcesType;
  businessSlug: string;
  userFullName: string;
  userEmail: string;
};

export default function SignUpOverview(props: SignUpOverviewProps) {
  return (
    <StyledContainer>
      <StyledField>
        <StyledLabel>What's your business name?</StyledLabel>
        <p>{props.businessName}</p>
      </StyledField>
      <StyledField>
        <StyledLabel>What's your business field?</StyledLabel>
        <p>{props.businessField}</p>
      </StyledField>
      <StyledField>
        <StyledLabel>What's your business address?</StyledLabel>
        <p>{props.businessAddress}</p>
      </StyledField>
      <StyledField>
        <StyledLabel>What's your business phone number?</StyledLabel>
        <p>{props.businessPhone}</p>
      </StyledField>
      <StyledField>
        <StyledLabel>
          Does your business offer refunds for cancelled reservations?
        </StyledLabel>
        <p>{DATA_DICTIONARY[props.businessDoesRefund]}</p>
      </StyledField>
      {props.businessDoesRefund === "yes" ? (
        <>
          {" "}
          <StyledField>
            <StyledLabel>What kind of refunds does it offer?</StyledLabel>
            <p>{DATA_DICTIONARY[props.businessRefundType]}</p>
          </StyledField>
          {props.refundDescription ? (
            <StyledField>
              <StyledLabel>Refund policy description</StyledLabel>
              <p>{props.refundDescription}</p>
            </StyledField>
          ) : null}
        </>
      ) : null}
      <StyledField>
        <StyledLabel>What best describes what you offer?</StyledLabel>
        <p>{DATA_DICTIONARY[props.businessResourcesType]}</p>
      </StyledField>
      <StyledField>
        <StyledLabel>Business slug</StyledLabel>
        <p>{props.businessSlug}</p>
      </StyledField>
      <StyledField>
        <StyledLabel>What is your full name?</StyledLabel>
        <p>{props.userFullName}</p>
      </StyledField>
      <StyledField>
        <StyledLabel>What is your e-mail address?</StyledLabel>
        <p>{props.userEmail}</p>
      </StyledField>
    </StyledContainer>
  );
}
