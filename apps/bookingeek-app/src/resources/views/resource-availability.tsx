import styled from "styled-components";
import {
  DayOfWeekAvailability,
  Resource,
} from "@bookingeek/api/src/resources/types";
import { useOutletContext } from "react-router";
import { capitalize } from "../../common/helpers/capitalize";
import IconButton from "../../common/components/icon-button/icon-button";
import AddIcon from "../../common/icons/add/add";
import Checkbox from "../../common/components/checkbox/checkbox";
import { useState } from "react";
import { DayOfWeekName } from "@bookingeek/api/src/common/types";
import { deepCopy } from "../../common/helpers/deep-copy";
import Button from "../../common/components/button/button";
import { useFormComparator } from "../../common/hooks/useFormComparator";
import { UpdateResourceDto } from "@bookingeek/api/src/resources/dto/update-resource.dto";
import { useUpdateResourceMutation } from "../resources-api";
import { useHandleRequestCall } from "../../common/hooks/handle-request-call";
import AvailabilityRangeRuleForm from "../components/availability-range-rule-form/availability-range-rule-form";

const StyledForm = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 640px;
`;

const StyledTitleLabel = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const StyledRulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledEmptyRulesText = styled.p`
  font-style: italic;
  text-align: center;
`;

const StyledDayOfWeekAvailabilityField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledDayOfWeekAvailabilityFieldLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDayOfWeekAvailabilityFieldLabel = styled.p<{ active?: boolean }>`
  display: flex;
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  padding-left: 8px;
  color: ${(props) => (props.active ? "inherit" : "#888888")};
`;

export default function ResourceAvailabilityView() {
  const handleRequestCall = useHandleRequestCall();
  const resource = useOutletContext<Resource<string>>();
  const [availabilityForm, setAvailabilityForm] = useState(
    deepCopy(resource.availability)
  );
  const [updateResource, updateData] = useUpdateResourceMutation();
  const isSaving = updateData.isLoading;
  const rulesList = Object.entries(availabilityForm);
  const { formChanged } = useFormComparator({
    availabilityForm,
  });
  const availabilityIsDateOnly = resource.availabilityType === "date-only";

  // Saves the current changes
  const onSaveClick = async () => {
    const dto: UpdateResourceDto = {
      ...resource,
      availability: availabilityForm,
    };
    const requestCall = await updateResource({ dto, id: resource._id });
    handleRequestCall(requestCall, "Changes saved successfully.");
  };

  // Adds a new time range/slot availability rule to a day of week
  const onAddRuleClick = (dayOfWeek: DayOfWeekName) => {
    const dayOfWeekRules = availabilityForm[dayOfWeek];
    const newRule = {
      endInMinutesPastMidnight: resource.reservationTimeGranularityMinutes,
      startInMinutesPastMidnight: 0,
    };
    dayOfWeekRules.rules.push(newRule);
    console.log("updated availability", {
      ...availabilityForm,
      [dayOfWeek]: dayOfWeekRules,
    });
    setAvailabilityForm({ ...availabilityForm, [dayOfWeek]: dayOfWeekRules });
  };

  // Toggles the availability of a day of week
  const onDayOfWeekToggle = (dayOfWeek: DayOfWeekName, available: boolean) => {
    const updatedAvailability = { ...availabilityForm };
    updatedAvailability[dayOfWeek].available = available;
    setAvailabilityForm(updatedAvailability);
  };

  // Removes a time range/slot availability rule from a day of week
  const onRemoveRuleClick = (dayOfWeek: DayOfWeekName, ruleIndex: number) => {
    const updatedAvailability = { ...availabilityForm };
    updatedAvailability[dayOfWeek].rules.splice(ruleIndex, 1);
    setAvailabilityForm(updatedAvailability);
  };

  // Separate render for availability rules
  const renderAvailabilityRules = (
    availability: DayOfWeekAvailability,
    dayOfWeek: DayOfWeekName
  ) =>
    availability.rules.length ? (
      availability.rules.map((rule, ruleIndex) => (
        <AvailabilityRangeRuleForm
          key={ruleIndex}
          timeRange={rule}
          reservationTimeGranularityMinutes={
            resource.reservationTimeGranularityMinutes
          }
          onRemoveClick={() =>
            onRemoveRuleClick(dayOfWeek as DayOfWeekName, ruleIndex)
          }
          reservationTimeType={resource.reservationTimeType}
        />
      ))
    ) : (
      <StyledEmptyRulesText>No rules set</StyledEmptyRulesText>
    );

  // Separate render for days of week
  const renderDaysOfWeek = () =>
    rulesList.map(([dayOfWeek, availability]) => (
      <StyledDayOfWeekAvailabilityField key={dayOfWeek}>
        <StyledDayOfWeekAvailabilityFieldLabelContainer>
          <Checkbox
            checked={availability.available}
            onChange={(checked) => {
              console.log(checked);
              onDayOfWeekToggle(dayOfWeek as DayOfWeekName, checked);
            }}
            size={20}
          />
          <StyledDayOfWeekAvailabilityFieldLabel
            active={availability.available}
          >
            {capitalize(dayOfWeek)}
          </StyledDayOfWeekAvailabilityFieldLabel>
          {availabilityIsDateOnly ? null : (
            <IconButton
              onClick={() => onAddRuleClick(dayOfWeek as DayOfWeekName)}
            >
              <AddIcon />
            </IconButton>
          )}
        </StyledDayOfWeekAvailabilityFieldLabelContainer>
        {availabilityIsDateOnly
          ? null
          : renderAvailabilityRules(availability, dayOfWeek as DayOfWeekName)}
      </StyledDayOfWeekAvailabilityField>
    ));

  return (
    <StyledForm>
      <div>
        <StyledTitleLabel>Resource Availability</StyledTitleLabel>
        <p>Set the available time</p>
      </div>
      <StyledRulesList>{renderDaysOfWeek()}</StyledRulesList>
      <div>
        <Button onClick={onSaveClick} disabled={!formChanged || isSaving}>
          Save Changes
        </Button>
      </div>
    </StyledForm>
  );
}
