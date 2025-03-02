import styled from "styled-components";
import ButtonRadio from "../../common/components/button-radio/button-radio";
import { useState } from "react";
import { useOutletContext } from "react-router";
import RadioCard from "../../common/components/radio-card/radio-card";
import FormField from "../../common/components/form-field/form-field";
import Button from "../../common/components/button/button";
import { useUpdateResourceMutation } from "../resources-api";
import { useHandleRequestCall } from "../../common/hooks/handle-request-call";
import { useFormComparator } from "../../common/hooks/useFormComparator";
import {
  Resource,
  ReservationTimeGranularity,
  UpdateResourcePayload,
} from "@bookingeek/core";

const StyledForm = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 640px;
`;

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledTitleLabel = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

const StyledRadioCardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Options for choosing a resource's availability type
const AVAILABILITY_TYPE_OPTIONS: Array<{
  label: string;
  value: "date-time" | "date-only";
}> = [
  {
    label: "Date & Time",
    value: "date-time",
  },
  {
    label: "Date Only",
    value: "date-only",
  },
];

// Options for choosing a resource's minimal reservation advance unit
const MINIMAL_RESERVATION_ADVANCE_UNIT_OPTIONS = [
  { label: "Hours", value: "hours" },
  { label: "Minutes", value: "minutes" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
];

const MINIMAL_RESERVATION_DURATION_UNIT_OPTIONS = [
  { label: "Hours", value: "hours" },
  { label: "Minutes", value: "minutes" },
];

const RESERVATION_TIME_GRANULARITY_OPTIONS = [
  { label: "Hourly", value: "hourly" },
  { label: "5 minutes", value: "5-min" },
  { label: "10 minutes", value: "10-min" },
  { label: "15 minutes", value: "15-min" },
  { label: "30 minutes", value: "30-min" },
];

export default function ResourceScheduleTypeView() {
  const handleRequestCall = useHandleRequestCall();
  const resource = useOutletContext<Resource<string>>();
  const [updateResource, updateData] = useUpdateResourceMutation();
  const isSaving = updateData.isLoading;
  const [availabilityType, setAvailabilityType] = useState<
    "date-time" | "date-only"
  >(resource.availabilityType);
  const [reservationTimeType, setReservationTimeType] = useState<
    "ranges" | "slots"
  >(resource.reservationTimeType);
  const [minimalReservationAdvanceAmount, setMinimalReservationAdvanceAmount] =
    useState(resource.minimalReservationAdvance.amount.toString());
  const [minimalReservationAdvanceUnit, setMinimalReservationAdvanceUnit] =
    useState(resource.minimalReservationAdvance.unit);
  const [
    reservationTimeGranularityMinutes,
    setReservationTimeGranularityMinutes,
  ] = useState(resource.reservationTimeGranularityMinutes);
  const [
    minimalReservationDurationAmount,
    setMinimalReservationDurationAmount,
  ] = useState(resource.minimalReservationDuration.amount.toString());
  const [minimalReservationDurationUnit, setMinimalReservationDurationUnit] =
    useState(resource.minimalReservationDuration.unit);
  const { formChanged } = useFormComparator({
    availabilityType,
    reservationTimeType,
    minimalReservationAdvanceAmount,
    minimalReservationAdvanceUnit,
    reservationTimeGranularityMinutes,
    minimalReservationDurationAmount,
    minimalReservationDurationUnit,
  });

  // Saves the current changes
  const onSaveClick = async () => {
    const dto: UpdateResourcePayload = {
      ...resource,
      availabilityType,
      reservationTimeType,
      minimalReservationAdvance: {
        amount: Number(minimalReservationAdvanceAmount),
        unit: minimalReservationAdvanceUnit,
      },
      reservationTimeGranularityMinutes,
      minimalReservationDuration: {
        amount: Number(minimalReservationDurationAmount),
        unit: minimalReservationDurationUnit,
      },
    };
    const requestCall = await updateResource({ dto, id: resource._id });
    handleRequestCall(requestCall, "Changes saved successfully.");
  };

  return (
    <StyledForm>
      <StyledFormField>
        <StyledTitleLabel>Schedule Type</StyledTitleLabel>
        <p>Set how customers can schedule your time</p>
      </StyledFormField>
      <ButtonRadio<"date-time" | "date-only">
        onChange={setAvailabilityType}
        options={AVAILABILITY_TYPE_OPTIONS}
        value={availabilityType}
      />
      {availabilityType !== "date-only" ? (
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
          <FormField<ReservationTimeGranularity>
            label="Time Granularity"
            description="Set the minimal time unit for a booking's duration"
            type="options-select"
            value={reservationTimeGranularityMinutes}
            onChange={setReservationTimeGranularityMinutes}
            options={RESERVATION_TIME_GRANULARITY_OPTIONS}
          />
          {reservationTimeType === "ranges" ? (
            <FormField
              label="Minimal Reservation Duration"
              description="Set the minimal duration for a reservation"
              type={"options-select-value"}
              value={minimalReservationDurationAmount}
              onChange={setMinimalReservationDurationAmount}
              inputValue={minimalReservationDurationUnit}
              onInputValueChange={setMinimalReservationDurationUnit}
              options={MINIMAL_RESERVATION_DURATION_UNIT_OPTIONS}
            />
          ) : null}
        </>
      ) : null}
      <FormField<"weeks" | "days" | "hours" | "minutes">
        type={"options-select-value"}
        label="Minimal Advance Time"
        description="Set the minimal time a booking has to be made in advance"
        value={minimalReservationAdvanceUnit}
        onChange={setMinimalReservationAdvanceUnit}
        inputValue={minimalReservationAdvanceAmount}
        onInputValueChange={setMinimalReservationAdvanceAmount}
        options={MINIMAL_RESERVATION_ADVANCE_UNIT_OPTIONS}
      />
      <div>
        <Button onClick={onSaveClick} disabled={!formChanged || isSaving}>
          Save Changes
        </Button>
      </div>
    </StyledForm>
  );
}
