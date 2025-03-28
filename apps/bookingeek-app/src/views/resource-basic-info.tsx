import styled from "styled-components";
import FormField from "../components/common/form-field";
import { useState } from "react";

import { useOutletContext } from "react-router";
import { RESOURCE_ICON } from "../data/resource-icons";

import ResourceItem from "../components/domain/resource-item";
import { useFormComparator } from "../hooks/useFormComparator";
import { useUpdateResourceMutation } from "../store/resources-api";
import { useHandleRequestCall } from "../hooks/handle-request-call";
import {
  Resource,
  ResourceIconName,
  ResourceCheckoutType,
  UpdateResourcePayload,
  RESOURCE_CHECKOUT_TYPES,
  ReservationTimeGranularity,
} from "@bookingeek/core";
import Button from "../components/common/button";
import IconButton from "../components/common/icon-button";
import Input from "../components/common/input";
import Select from "../components/common/select";
import { isPriceValid } from "../helpers/is-price-valid";
import { onFormatCurrency } from "../helpers/on-format-currency";
import { RESOURCE_PRICE_TYPES } from "../data/resource-price-types";
import { validateSlug } from "../helpers/slug-is-valid";
import { getFileUrl } from "../helpers/get-file-url";
import { uploadFile } from "../helpers/upload-file";
import { toastNotificationShown } from "../store/common-slice";
import { useAppDispatch } from "../store/store";

const RESOURCE_FILE_INPUT_ID = "reosurce-file-input";

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

const StyledUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const StyledPictureErrorLabel = styled.p`
  color: #aa3131;
`;

const StyledPicturePreview = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 240px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
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

const StyledButton = styled(Button)`
  @media screen and (min-width: 768px) {
    align-self: baseline;
  }
`;

export default function ResourceBasicInfoView() {
  const dispatch = useAppDispatch();
  const resource = useOutletContext<Resource<string>>();
  const handleRequestCall = useHandleRequestCall();
  const [isSaving, setIsSaving] = useState(false);
  const [updateResource] = useUpdateResourceMutation();
  const [pictureType, setPictureType] = useState<"icon" | "picture">(
    resource.picture.src.length ? "picture" : "icon"
  );
  const [resourceIcon, setResourceIcon] = useState<ResourceIconName>(
    resource.picture.icon
  );
  const [newPicture, setNewPicture] = useState<string | null>(null);
  const [picturePreviewUrl, setPicturePreviewUrl] = useState(
    resource.picture.src.length ? resource.picture.src[0] : null
  );
  const [pictureError, setPictureError] = useState("");
  const [hasPrice, setHasPrice] = useState<"yes" | "no">(
    resource.priceInCents === null ? "no" : "yes"
  );
  const [priceString, setPriceString] = useState(
    resource.priceInCents ? (resource.priceInCents / 100).toFixed(2) : "0.00"
  );
  const [priceTypeMinutes, setPriceTypeMinutes] =
    useState<ReservationTimeGranularity>(resource.priceTypeMinutes);
  const [checkoutType, setCheckoutType] = useState<ResourceCheckoutType>(
    resource.checkoutType
  );
  const [title, setTitle] = useState(resource.title);
  const [subtitle, setSubtitle] = useState(resource.subtitle);
  const [description, setDescription] = useState(resource.description);
  const [slug, setSlug] = useState(resource.slug);
  const priceIsValid = isPriceValid(priceString);
  const slugIsValid = validateSlug(slug);
  const { formChanged } = useFormComparator({
    pictureType,
    newPicture,
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
    setIsSaving(true);
    let uploadedFileUrl: string | null = "";
    if (newPicture) {
      const fileInput = document.getElementById(
        RESOURCE_FILE_INPUT_ID
      ) as HTMLInputElement;
      if (!fileInput) {
        throw new Error("Could not get file input");
      }
      const files = fileInput.files;
      if (files?.length) {
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        const { success, error } = await uploadFile(formData);
        if (success) {
          uploadedFileUrl = getFileUrl(success.path);
        }
        if (error) {
          dispatch(
            toastNotificationShown({
              message:
                "There was an error while uploading the picture. Please try again.",
              type: "error",
            })
          );
          setIsSaving(false);
          return;
        }
      }
    }
    const dto: UpdateResourcePayload = {
      ...resource,
      picture: {
        icon: resourceIcon,
        src:
          pictureType === "icon"
            ? []
            : [uploadedFileUrl || resource.picture.src[0]],
      },
      priceInCents: hasPrice ? Number(priceString) * 100 : null,
      checkoutType,
      title,
      subtitle,
      description,
      slug,
    };
    const updateRequest = await updateResource({ dto, id: resource._id });
    handleRequestCall(updateRequest, "Changes saved successfully.");
    setIsSaving(false);
  };

  // Called when clicking the "Upload" button
  const onUploadFileClick = () => {
    const fileInput = document.getElementById(RESOURCE_FILE_INPUT_ID);
    if (!fileInput) {
      throw new Error("Could not get file input");
    }
    fileInput.click();
  };

  // Called after picking a picture to upload
  const onFileChanged = () => {
    const fileInput = document.getElementById(
      RESOURCE_FILE_INPUT_ID
    ) as HTMLInputElement;
    if (!fileInput) {
      throw new Error("Could not get file input");
    }
    const files = fileInput.files;
    if (files?.length) {
      const file = files[0];
      const validExtensions = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg",
      ];
      if (!validExtensions.includes(file.type)) {
        setPictureError("This is not a valid image file.");
        return;
      }
      setPictureError("");
      const previewUrl = URL.createObjectURL(file);
      setPicturePreviewUrl(previewUrl);
      setNewPicture(previewUrl);
    }
  };

  return (
    <StyledForm>
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
                  onClick={() => setResourceIcon(iconName as ResourceIconName)}
                >
                  {icon}
                </StyledIconButton>
              )
            )}
          </StyledIconList>
        ) : (
          <StyledUploadContainer>
            {picturePreviewUrl ? (
              <StyledPicturePreview src={picturePreviewUrl} />
            ) : (
              <>No picture yet</>
            )}
            {pictureError ? (
              <StyledPictureErrorLabel>{pictureError}</StyledPictureErrorLabel>
            ) : null}
            <input
              type="file"
              hidden
              id={RESOURCE_FILE_INPUT_ID}
              onChange={onFileChanged}
            />
            <StyledButton onClick={onUploadFileClick}>Upload</StyledButton>
          </StyledUploadContainer>
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
              fullwidth
            />
            <Select
              value={priceTypeMinutes}
              onChange={({ target: { value } }) =>
                setPriceTypeMinutes(Number(value) as ReservationTimeGranularity)
              }
            >
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
      <FormField label="Title" value={title} onChange={setTitle} />
      <FormField label="Subtitle" value={subtitle} onChange={setSubtitle} />
      <FormField
        label="Description"
        type="text-long"
        value={description}
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
        isActive={true}
        picture={{
          icon: resourceIcon,
          src:
            pictureType === "picture" && picturePreviewUrl
              ? [picturePreviewUrl]
              : [],
        }}
        priceInCents={Number(priceString) * 100}
        priceTypeMinutes={resource.priceTypeMinutes}
        title={title}
        subtitle={subtitle}
        description={description}
      />
      <StyledButton onClick={onSaveClick} disabled={!formChanged || isSaving}>
        Save Changes
      </StyledButton>
    </StyledForm>
  );
}
