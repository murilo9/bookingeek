import styled from "styled-components";
import FormField from "../../common/components/form-field/form-field";
import { useState } from "react";

import { useOutletContext } from "react-router";
import { RESOURCE_ICON } from "../data/resource-icons";
import IconButton from "../../common/components/icon-button/icon-button";
import Input from "../../common/components/input/input";
import Select from "../../common/components/select/select";
import ResourceItem from "../components/resource-item/resource-item";
import { onFormatCurrency } from "../../common/helpers/on-format-currency";
import { isPriceValid } from "../../common/helpers/is-price-valid";
import Button from "../../common/components/button/button";
import { useFormComparator } from "../../common/hooks/useFormComparator";
import { useUpdateResourceMutation } from "../resources-api";
import { useHandleRequestCall } from "../../common/hooks/handle-request-call";
import {
  Resource,
  ResourceIconName,
  ResourceCheckoutType,
  UpdateResourceDto,
} from "@bookingeek/core";

const RESOURCE_CHECKOUT_TYPES: Record<string, string> = {
  "in-loco-online": "In-loco & online",
  "in-loco-only": "In-loco only",
  "online-only": "Online only",
};
const RESOURCE_PRICE_TYPES: Record<string, string> = {
  hourly: "hour",
  "30-min": "30 min",
  "15-min": "15 min",
  "10-min": "10 min",
  "5-min": "5 min",
};

const StyledForm = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 640px;
`;

const StyledIconList = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 8px;
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

const StyledTitleLabel = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

const StyledErrorHelperText = styled.p`
  margin-left: 8px;
  margin-top: 8px;
  font-size: 14px;
  color: #ff0000;
`;

export default function ResourceBasicInfoView() {
  const resource = useOutletContext<Resource<string>>();
  const handleRequestCall = useHandleRequestCall();
  const [updateResource, updateData] = useUpdateResourceMutation();
  const [pictureType, setPictureType] = useState<"icon" | "picture">(
    resource.picture.icon ? "icon" : "picture"
  );
  const [resourceIcon, setResourceIcon] = useState<ResourceIconName>(
    resource.picture.icon
  );
  const [hasPrice, setHasPrice] = useState<"yes" | "no">(
    resource.priceInCents === null ? "no" : "yes"
  );
  const [priceString, setPriceString] = useState(
    resource.priceInCents ? (resource.priceInCents / 100).toFixed(2) : "0.00"
  );
  const [checkoutType, setCheckoutType] = useState<ResourceCheckoutType>(
    resource.checkoutType
  );
  const [title, setTitle] = useState(resource.title);
  const [subtitle, setSubtitle] = useState(resource.subtitle);
  const [description, setDescription] = useState(resource.description);
  const [slug, setSlug] = useState(resource.slug);
  const priceIsValid = isPriceValid(priceString);
  const slugIsValid = new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(slug);
  const isSaving = updateData.isLoading;
  const { formChanged } = useFormComparator({
    pictureType,
    resourceIcon,
    hasPrice,
    priceString,
    checkoutType,
    title,
    subtitle,
    description,
    slug,
  });

  const onSaveClick = async () => {
    const dto: UpdateResourceDto = {
      ...resource,
      picture: { icon: resourceIcon, src: [] },
      priceInCents: hasPrice ? Number(priceString) * 100 : null,
      checkoutType,
      title,
      subtitle,
      description,
      slug,
    };
    const updateRequest = await updateResource({ dto, id: resource._id });
    handleRequestCall(updateRequest, "Changes saved successfully.");
  };

  return (
    <StyledForm>
      <FormField
        label="Image"
        type="options-radio"
        onChange={setPictureType}
        value={pictureType}
        options={[
          { label: "Icon", value: "icon" },
          { label: "Picture", value: "picture" },
        ]}
      >
        <StyledIconList>
          {Object.entries(RESOURCE_ICON("inherit", 24)).map(
            ([iconName, icon]) => (
              <StyledIconButton
                key={iconName}
                selected={resourceIcon === iconName}
                onClick={() => setResourceIcon(iconName as ResourceIconName)}
              >
                {icon}
              </StyledIconButton>
            )
          )}
        </StyledIconList>
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
            {/* TODO: price string formatter */}
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
        type="options-radio"
        value={checkoutType}
        onChange={setCheckoutType}
        options={Object.entries(RESOURCE_CHECKOUT_TYPES).map(
          ([value, label]) => ({ value, label })
        )}
      />
      <FormField label="Title" value={title} onChange={setTitle} />
      <FormField label="Subtitle" value={subtitle} onChange={setSubtitle} />
      <FormField
        label="Description"
        type="text-long"
        value={title}
        onChange={setDescription}
      />
      <FormField
        label="Slug"
        description="Used in URLs"
        helperText={
          slugIsValid ? `https://bookingeek.com/r/${slug}` : "Invalid slug"
        }
        value={slug}
        onChange={setSlug}
        error={!slugIsValid}
      />
      <StyledTitleLabel>Preview</StyledTitleLabel>
      <ResourceItem
        picture={{ icon: resourceIcon, src: [] }}
        priceInCents={Number(priceString) * 100}
        priceTypeMinutes={resource.priceTypeMinutes}
        title={title}
        subtitle={subtitle}
        description={description}
      />
      <div>
        <Button onClick={onSaveClick} disabled={!formChanged || isSaving}>
          Save Changes
        </Button>
      </div>
    </StyledForm>
  );
}
