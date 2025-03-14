import styled from "styled-components";
import { FormFieldLabel } from "../components/common/form-field-label";
import CircularPictureUpload from "../components/domain/circular-picture-upload";
import Button from "../components/common/button";
import FormField from "../components/common/form-field";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  useGetBusinessByIdQuery,
  useUpdateBusinessMutation,
} from "../store/businesses-api";
import {
  BUSINESS_REFUND_TYPES,
  BusinessRefundType,
} from "../types/business-refund-type";
import { UpdateBusinessPayload } from "@bookingeek/core";
import { uploadFile } from "../helpers/upload-file";
import { getFileUrl } from "../helpers/get-file-url";
import { useAppDispatch } from "../store/store";
import { toastNotificationShown } from "../store/common-slice";
import { validateSlug } from "../helpers/slug-is-valid";
import IconButton from "../components/common/icon-button";
import CopyIcon from "../components/icons/copy/copy";

const BUSINESS_FILE_INPUT_ID = "business-picture-upload-input";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
`;

const StyledRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  @media screen and (min-width: 768px) {
    align-self: baseline;
  }
`;

export default function BusinessInfoView() {
  const dispatch = useAppDispatch();
  const [updateBusiness] = useUpdateBusinessMutation();
  const { user } = useAuth();
  const { data: business, isLoading: isLoadingBusiness } =
    useGetBusinessByIdQuery(user?.businessId || "");
  const [savingChanges, setSavingChanges] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [businessPicture, setBusinessPicture] = useState<string | null>(null);
  const [picturePreviewUrl, setPicturePreviewUrl] = useState<string | null>(
    null
  );
  const [businessDoesRefund, setBusinessDoesRefund] = useState<"yes" | "no">(
    "yes"
  );
  const [businessRefundType, setBusinessRefundType] =
    useState<BusinessRefundType>("total");
  const [refundDescription, setRefundDescription] = useState("");
  const [pictureError, setPictureError] = useState("");
  const slugIsValid = validateSlug(slug);

  // Initializes the form fields once business data is loaded
  useEffect(() => {
    if (business) {
      setName(business.name);
      setSlug(business.slug);
      setAddress(business.address);
      setPhone(business.phone);
      setPicturePreviewUrl(business.pictureUrl);
      setBusinessDoesRefund(business.refundingPolicy.doesRefund ? "yes" : "no");
      setBusinessRefundType(business.refundingPolicy.refundType);
      setRefundDescription(business.refundingPolicy.description);
    }
  }, [business]);

  const onCopylugUrl = () => {
    navigator.clipboard.writeText(
      `https://bookingeek.com/business/${business!._id}`
    );
    dispatch(
      toastNotificationShown({ message: "Link copied.", type: "neutral" })
    );
  };

  const onSubmit = async () => {
    setSavingChanges(true);
    let uploadedFileUrl;
    // If there is a new picture, uploads it
    if (businessPicture) {
      const fileInput = document.getElementById(
        BUSINESS_FILE_INPUT_ID
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
          setSavingChanges(false);
          return;
        }
      }
    }
    const payload: UpdateBusinessPayload = {
      name,
      slug,
      address,
      phone,
      pictureUrl: uploadedFileUrl || business!.pictureUrl,
      refundingPolicy: {
        description: refundDescription,
        doesRefund: businessDoesRefund === "yes",
        refundType: businessRefundType,
      },
    };
    const { data, error } = await updateBusiness({
      id: business!._id,
      payload,
    });
    if (error) {
      console.log(error);
      // TODO: handle error
    }
    if (data) {
      dispatch(
        toastNotificationShown({
          message: "Changes saved successfully.",
          type: "success",
        })
      );
    }
    setSavingChanges(false);
  };

  const onFileChanged = () => {
    const fileInput = document.getElementById(
      BUSINESS_FILE_INPUT_ID
    ) as HTMLInputElement;
    if (!fileInput) {
      throw new Error("Could not get file input at CirclePictureUpload");
    }
    const { files } = fileInput;
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
      setBusinessPicture(previewUrl);
    }
  };

  return isLoadingBusiness ? (
    "Loading..."
  ) : (
    <StyledContainer>
      <div>
        <FormFieldLabel>Picture</FormFieldLabel>
        <CircularPictureUpload
          id={BUSINESS_FILE_INPUT_ID}
          previewUrl={picturePreviewUrl || "/business.png"}
          onChange={onFileChanged}
        />
      </div>
      <FormField value={name} onChange={setName} label="Name" />
      {/* TODO: validate slug for uniqueness */}
      <FormField
        value={slug}
        onChange={setSlug}
        label="Slug"
        helperText={
          <StyledRow>
            <span>
              {slugIsValid
                ? `Preview: https://bookingeek.com/business/${slug}`
                : "Slug is not valid"}
            </span>
            <IconButton onClick={onCopylugUrl}>
              <CopyIcon />
            </IconButton>
          </StyledRow>
        }
        error={!slugIsValid}
      />
      <FormField value={address} onChange={setAddress} label="Address" />
      <FormField value={phone} onChange={setPhone} label="Phone" />
      <StyledContainer>
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
      </StyledContainer>
      <StyledButton onClick={onSubmit}>Save Changes</StyledButton>
    </StyledContainer>
  );
}
