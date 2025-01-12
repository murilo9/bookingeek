import styled from "styled-components";
import FormField from "../../common/components/form-field/form-field";
import { useState } from "react";
import {
  ResourceCheckoutType,
  ResourceIconName,
} from "@bookingeek/api/src/resources/types";
import { useOutletContext } from "react-router";
import { RESOURCE_ICON } from "../data/resource-icons";
import IconButton from "../../common/components/icon-button/icon-button";
import Input from "../../common/components/input/input";
import Select from "../../common/components/select/select";
import { RESOURCE_PRICE_TYPES } from "@bookingeek/api/src/resources/types";
import { Resource } from "@bookingeek/api/src/resources/types/resource";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
`;

const StyledPriceInputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  margin-top: 8px;
`;

export default function ResourceBasicInfoView() {
  const resource = useOutletContext<Resource<string>>();
  const [pictureType, setPictureType] = useState<"icon" | "pictures">(
    resource.picture.icon ? "icon" : "pictures"
  );
  const [resourceIcon, setResourceIcon] = useState<ResourceIconName>(
    resource.picture.icon
  );
  const [hasPrice, setHasPrice] = useState<"yes" | "no">(
    resource.priceInCents === null ? "yes" : "no"
  );
  const [priceString, setPriceString] = useState(
    resource.priceInCents ? (resource.priceInCents / 100).toFixed(2) : "0.00"
  );
  const [checkoutType, setCheckoutType] = useState<ResourceCheckoutType>(
    resource.checkoutType
  );

  return (
    <StyledForm>
      <FormField
        label="Image"
        type="radio"
        onChange={setPictureType}
        value={pictureType}
        options={[
          { label: "Icon", value: "icon" },
          { label: "Pictures", value: "pictures" },
        ]}
      >
        <StyledIconList>
          {Object.entries(RESOURCE_ICON("inherit", 24)).map(
            ([iconName, icon]) => (
              <StyledIconButton
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
        type="radio"
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
              onChange={({ target: { value } }) => setPriceString(value)}
            />
            <Select>
              {Object.entries(RESOURCE_PRICE_TYPES).map(([type, label]) => (
                <option value={type}>{label}</option>
              ))}
            </Select>
          </StyledPriceInputGrid>
        ) : null}
      </FormField>
    </StyledForm>
  );
}
