import {
  CreateResourcePayload,
  RESOURCE_CHECKOUT_TYPES,
  ResourceCheckoutType,
  ResourceIconName,
} from "@bookingeek/core";
import { useState } from "react";
import styled from "styled-components";
import FormField from "../components/common/form-field";
import IconButton from "../components/common/icon-button";
import { RESOURCE_ICON } from "../data/resource-icons";
import ButtonRadio from "../components/common/button-radio";
import Input from "../components/common/input";
import Select from "../components/common/select";
import { onFormatCurrency } from "../helpers/on-format-currency";
import { isPriceValid } from "../helpers/is-price-valid";
import { RESOURCE_PRICE_TYPES } from "../data/resource-price-types";
import Button from "../components/common/button";
import RadioCard from "../components/common/radio-card";
import { AVAILABILITY_TYPE_OPTIONS } from "../data/availability-type-options";
import ResourceItem from "../components/domain/resource-item";
import { validateSlug } from "../helpers/slug-is-valid";
import { getSlug } from "../helpers/get-slug";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../store/store";
import { toastNotificationShown } from "../store/common-slice";
import { useAuth } from "../hooks/useAuth";
import { useGetBusinessByIdQuery } from "../store/businesses-api";
import { useCreateResourceMutation } from "../store/resources-api";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
`;

const StyledFormBlockTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

const StyledFormBlockSubtitle = styled.p`
  color: #444444;
`;

const StyledIconList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const StyledIconButton = styled(IconButton)<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  background: ${(props) => (props.selected ? "#c6c6c6" : "none")};
  &:hover {
    background: ${(props) => (props.selected ? "#c6c6c6" : "#f8f8f8")};
  }
`;

const StyledPriceInputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  margin-top: 20px;
`;

const StyledErrorHelperText = styled.p`
  margin-left: 8px;
  margin-top: 8px;
  font-size: 14px;
  color: #ff0000;
`;

const StyledRadioCardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledButton = styled(Button)`
  @media screen and (min-width: 768px) {
    align-self: baseline;
  }
`;

export default function CreateResourceView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [createResource] = useCreateResourceMutation();
  const [creatingResource, setCreatingResource] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [pictureType, setPictureType] = useState<"icon" | "picture">("picture");
  const [resourceIcon, setResourceIcon] = useState<ResourceIconName>("bed");
  const [hasPrice, setHasPrice] = useState<"yes" | "no">("no");
  const [priceString, setPriceString] = useState("0.00");
  const [checkoutType, setCheckoutType] =
    useState<ResourceCheckoutType>("in-loco-online");
  const [availabilityType, setAvailabilityType] = useState<
    "date-time" | "date-only"
  >("date-time");
  const [reservationTimeType, setReservationTimeType] = useState<
    "ranges" | "slots"
  >("slots");
  const priceIsValid = isPriceValid(priceString);
  const [slugError, setSlugError] = useState(false);
  const maySubmit = title.trim() && slug.trim() && validateSlug(slug);
  const { data: business } = useGetBusinessByIdQuery(user?.businessId || "");

  // Forms the slug if not formed yet, after title changes
  const onTitleInputBlur = () => {
    if (!slug.trim()) {
      setSlug(getSlug(title));
    }
  };

  const onValidateSlug = () => {
    setSlugError(!validateSlug(slug));
  };

  const onCreateResourceClick = async () => {
    setCreatingResource(true);
    const createResourcePayload: CreateResourcePayload = {
      title,
      subtitle,
      description,
      slug,
      availabilityType,
      checkoutType,
      reservationTimeType,
    };
    const { data, error } = await createResource(createResourcePayload);
    if (error) {
      console.log(error);
      // TODO: handle error
    }
    if (data) {
      dispatch(
        toastNotificationShown({
          message: "Resource created successfully.",
          type: "success",
        })
      );
      navigate("/resources");
    }
    setCreatingResource(false);
  };

  return (
    <StyledContainer>
      <StyledFormBlock>
        <div>
          <StyledFormBlockTitle>Basic Info</StyledFormBlockTitle>
          <StyledFormBlockSubtitle>
            Basic information about this resource
          </StyledFormBlockSubtitle>
        </div>
        <FormField
          label="Title"
          value={title}
          onChange={setTitle}
          onBlur={onTitleInputBlur}
        />
        <FormField
          label="Slug"
          description="Used in URLs"
          helperText={
            slugError
              ? "Invalid slug"
              : `https://bookingeek.com/b/${business?.slug}/${slug}`
          }
          value={slug}
          onChange={setSlug}
          onBlur={onValidateSlug}
          error={slugError}
        />
        <FormField label="Subtitle" value={subtitle} onChange={setSubtitle} />
        <FormField
          label="Description"
          type="text-long"
          value={description}
          onChange={setDescription}
        />
        <FormField
          label="Image"
          description="Choose an icon or upload a picture"
          type="options-radio"
          orientation="row"
          onChange={setPictureType}
          value={pictureType}
          options={[
            { label: "Icon", value: "icon" },
            { label: "Picture", value: "picture" },
          ]}
        >
          {pictureType === "icon" ? (
            <StyledIconList>
              {Object.entries(RESOURCE_ICON("inherit", 24)).map(
                ([iconName, icon]) => (
                  <StyledIconButton
                    key={iconName}
                    selected={resourceIcon === iconName}
                    onClick={() =>
                      setResourceIcon(iconName as ResourceIconName)
                    }
                  >
                    {icon}
                  </StyledIconButton>
                )
              )}
            </StyledIconList>
          ) : (
            "TODO: file upload input"
          )}
        </FormField>

        <FormField
          label="Base Price"
          type="options-radio"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          description="Does this resource have a price?"
          value={hasPrice}
          onChange={setHasPrice}
        >
          {hasPrice === "yes" ? (
            <StyledPriceInputGrid>
              <Input
                value={priceString}
                onChange={({ target: { value } }) =>
                  onFormatCurrency(value.trim(), setPriceString)
                }
                error={!priceIsValid}
              />
              <Select>
                {Object.entries(RESOURCE_PRICE_TYPES).map(([type, label]) => (
                  <option value={type} key={type}>
                    {label}
                  </option>
                ))}
              </Select>
              {!priceIsValid ? (
                <StyledErrorHelperText>
                  Invalid price (must have two decimal digits)
                </StyledErrorHelperText>
              ) : null}
            </StyledPriceInputGrid>
          ) : null}
        </FormField>
        <FormField
          label="Checkout Options"
          description="Set how customers can pay"
          type="options-radio"
          value={checkoutType}
          onChange={setCheckoutType}
          options={Object.entries(RESOURCE_CHECKOUT_TYPES).map(
            ([value, label]) => ({ value, label })
          )}
        />
      </StyledFormBlock>
      <StyledFormBlock>
        <div>
          <StyledFormBlockTitle>Schedule Type</StyledFormBlockTitle>
          <StyledFormBlockSubtitle>
            Set how customers can schedule your time
          </StyledFormBlockSubtitle>
        </div>
        <ButtonRadio<"date-time" | "date-only">
          onChange={setAvailabilityType}
          options={AVAILABILITY_TYPE_OPTIONS}
          value={availabilityType}
        />
        {availabilityType === "date-time" ? (
          <>
            <StyledRadioCardsList>
              <RadioCard
                title="Time Ranges"
                description="People can book time ranges of different lengths."
                isSelected={reservationTimeType === "ranges"}
                onClick={() => setReservationTimeType("ranges")}
              />
              <RadioCard
                title="Fixed Slots"
                description="People choose between specific, fixed-duration slots."
                isSelected={reservationTimeType === "slots"}
                onClick={() => setReservationTimeType("slots")}
              />
            </StyledRadioCardsList>
          </>
        ) : null}
      </StyledFormBlock>
      <StyledFormBlock>
        <StyledFormBlockTitle>Preview</StyledFormBlockTitle>
        <ResourceItem
          picture={{ icon: resourceIcon, src: [] }}
          priceInCents={Number(priceString) * 100}
          priceTypeMinutes={60}
          title={title}
          subtitle={"Subtitle goes here"}
          description="Description goes here"
        />
      </StyledFormBlock>
      <StyledButton
        disabled={!maySubmit || creatingResource}
        onClick={onCreateResourceClick}
      >
        Create
      </StyledButton>
    </StyledContainer>
  );
}
