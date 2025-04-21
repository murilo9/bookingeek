import styled from "styled-components";

import { ReservationFormSteps } from "../../types/reservation-form-steps";
import {
  Resource,
  RetrieveResourceAvailabilityResponse,
  TimeRange,
} from "@bookingeek/core";
import Button from "../common/button";
import CalendarPicker from "../common/calendar-picker";
import FormHeader from "../common/form-header";
import ResourceTimeRangePicker from "./resource-time-range-picker";
import ResourceTimeSlotPicker from "./resource-time-slot-picker";
import { useEffect, useState } from "react";
import { useLazyGetResourceMonthAvailabilityQuery } from "../../store/resources-api";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const StyledDateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 32px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

type DateSelectStepProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedTime: {
    startMinutes: number;
    endMinutes: number;
  } | null;
  currentStep: ReservationFormSteps;
  setSelectedTime: (
    time: { startMinutes: number; endMinutes: number } | null
  ) => void;
  onNextClick: () => void;
  onBackClick: () => void;
  resource: Resource<string>;
};

export default function DateTimeSelectStep({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  currentStep,
  resource,
  onNextClick,
  onBackClick,
}: DateSelectStepProps) {
  const [getResourceMonthAvailability] =
    useLazyGetResourceMonthAvailabilityQuery();
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  const [availabilityData, setAvailabilityData] = useState<
    RetrieveResourceAvailabilityResponse<string>
  >({ days: [], reservations: [] });
  const [fetchingResourceAvailability, setFetchingResourceAvailability] =
    useState(true);

  // Fetches selected month's resource's availability every time the selected resource changes
  useEffect(() => {
    const loadAvailability = async () => {
      setFetchingResourceAvailability(true);
      const { data } = await getResourceMonthAvailability({
        resourceId: resource._id,
        month: String(displayMonth),
        year: String(displayYear),
      });
      if (data) {
        setAvailabilityData(data);
      }
      setFetchingResourceAvailability(false);
    };
    loadAvailability();
  }, [resource, displayMonth, displayYear]);

  // Go to previous month
  const onPrevMonthClick = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  // Go to next month
  const onNextMonthClick = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const canGoToNextStep =
    Boolean(selectedDate) &&
    (resource.availabilityType === "date-only" ? true : Boolean(selectedTime));
  const selectedDayAvailabilityData = selectedDate
    ? availabilityData.days[selectedDate.getDate()]
    : null;
  // Available days in the month that will be clickable in the calendar picker, if selected resource availability is date-only
  const availableDaysOfSelectedMonth = availabilityData.days.map(
    (dayData) =>
      dayData.available &&
      (resource.availabilityType === "date-only"
        ? !dayData.hasAnyReservationInDay
        : resource.reservationTimeType === "slots"
          ? dayData.availableSlots.length > 0
          : true)
  );
  // Availability rules for the selected day of week. Only applies for time-slot/range resources
  const selectedDayOfWeekAvailabilityRules: TimeRange[] =
    selectedDayAvailabilityData
      ? resource.reservationTimeType === "ranges"
        ? selectedDayAvailabilityData.rules
        : resource.reservationTimeType === "slots"
          ? selectedDayAvailabilityData.availableSlots
          : []
      : [];

  // Shortcuts if current step is != 'dateTimeSelect'
  if (currentStep !== "dateTimeSelect") {
    return;
  }

  return (
    <StyledContainer>
      <FormHeader>
        {!Boolean(selectedDate)
          ? !Boolean(selectedTime)
            ? "Pick a date"
            : "Pick a time"
          : "Pick a time"}
      </FormHeader>
      <StyledDateTimeContainer>
        {/* TODO: add a skeleton loader here */}
        {fetchingResourceAvailability ? (
          "Loading..."
        ) : (
          <CalendarPicker
            value={selectedDate}
            onChange={setSelectedDate}
            displayMonth={displayMonth}
            displayYear={displayYear}
            onNextClick={onNextMonthClick}
            onPrevClick={onPrevMonthClick}
            availableDaysOfSelectedMonth={availableDaysOfSelectedMonth}
            disablePastDates={true}
          />
        )}
        {selectedDate ? (
          resource.availabilityType ===
          "date-only" ? null : resource.reservationTimeType === "ranges" ? (
            <ResourceTimeRangePicker
              resource={resource}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          ) : (
            <ResourceTimeSlotPicker
              resource={resource}
              availableRules={selectedDayOfWeekAvailabilityRules}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )
        ) : null}
      </StyledDateTimeContainer>
      <StyledButtonsContainer>
        <Button onClick={onBackClick} variant="secondary">
          Back
        </Button>
        <Button disabled={!canGoToNextStep} onClick={onNextClick}>
          Next
        </Button>
      </StyledButtonsContainer>
    </StyledContainer>
  );
}
