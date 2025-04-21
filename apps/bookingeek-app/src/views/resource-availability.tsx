import styled from "styled-components";
import { useOutletContext } from "react-router";
import { useState } from "react";
import { useFormComparator } from "../hooks/useFormComparator";
import { useUpdateResourceMutation } from "../store/resources-api";
import { useHandleRequestCall } from "../hooks/handle-request-call";
import AvailabilityTimeRuleForm from "../components/domain/availability-time-rule-form";
import {
  Resource,
  UpdateResourcePayload,
  DayOfWeekName,
  TimeRange,
  DayOfWeekAvailability,
} from "@bookingeek/core";
import Button from "../components/common/button";
import Checkbox from "../components/common/checkbox";
import IconButton from "../components/common/icon-button";
import AddIcon from "../components/icons/add/add";
import { capitalize } from "../helpers/capitalize";
import { deepCopy } from "../helpers/deep-copy";
import CopyIcon from "../components/icons/copy/copy";
import PasteIcon from "../components/icons/paste/paste";
import { validateAvailablilityRulesList } from "../helpers/validate-availability-rules-list";

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

const StyledInvalidRulesLabel = styled.p`
  color: #aa3131;
  font-size: 14px;
  font-weight: 500;
  margin-left: 16px;
`;

export default function ResourceAvailabilityView() {
  const handleRequestCall = useHandleRequestCall();
  const resource = useOutletContext<Resource<string>>();
  const [availabilityForm, setAvailabilityForm] = useState(
    deepCopy(resource.availability)
  );
  const [updateResource, updateData] = useUpdateResourceMutation();
  const [copiedRules, setCopiedRules] = useState<Array<TimeRange> | null>(null);
  const isSaving = updateData.isLoading;
  const rulesList = Object.entries(availabilityForm);
  const { formChanged } = useFormComparator({
    availabilityForm,
  });
  const availabilityIsDateOnly = resource.availabilityType === "date-only";

  // Saves the current changes
  const onSaveClick = async () => {
    const dto: UpdateResourcePayload = {
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
      endTimeInMinutesPastMidnight: resource.reservationTimeGranularityMinutes,
      startTimeInMinutesPastMidnight: 0,
    };
    dayOfWeekRules.rules.push(newRule);
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

  // Updates a time range inside a day of week in availabiltyForm
  const onAvailabilityRangeRuleChange = (
    dayOfWeekName: DayOfWeekName,
    ruleIndex: number,
    timeRange: TimeRange
  ) => {
    const availabilityDayToUpdate = availabilityForm[dayOfWeekName];
    availabilityDayToUpdate.rules.splice(ruleIndex, 1, timeRange);
    setAvailabilityForm({
      ...availabilityForm,
      [dayOfWeekName]: availabilityDayToUpdate,
    });
  };

  // Separate render for availability rules
  const renderAvailabilityRules = (
    availability: DayOfWeekAvailability,
    dayOfWeek: DayOfWeekName,
    rulesAreValid: boolean
  ) =>
    availability.rules.length ? (
      availability.rules.map((rule, ruleIndex) => (
        <AvailabilityTimeRuleForm
          key={ruleIndex}
          timeRange={rule}
          reservationTimeGranularityMinutes={
            resource.reservationTimeGranularityMinutes
          }
          onRemoveClick={() =>
            onRemoveRuleClick(dayOfWeek as DayOfWeekName, ruleIndex)
          }
          reservationTimeType={resource.reservationTimeType}
          onChange={(timeRange) =>
            onAvailabilityRangeRuleChange(dayOfWeek, ruleIndex, timeRange)
          }
          error={!rulesAreValid}
        />
      ))
    ) : (
      <StyledEmptyRulesText>No rules set</StyledEmptyRulesText>
    );

  const onPasteRules = (dayOfWeek: DayOfWeekName) => {
    const dayOfWeekRules = availabilityForm[dayOfWeek];
    dayOfWeekRules.rules.push(...copiedRules!);
    setAvailabilityForm({ ...availabilityForm, [dayOfWeek]: dayOfWeekRules });
  };

  // Separate render for days of week
  const renderDaysOfWeek = () =>
    rulesList.map(([dayOfWeek, availability]) => {
      const rulesAreValid = validateAvailablilityRulesList(availability.rules);
      return (
        <StyledDayOfWeekAvailabilityField key={dayOfWeek}>
          <StyledDayOfWeekAvailabilityFieldLabelContainer>
            <Checkbox
              checked={availability.available}
              onChange={(checked) =>
                onDayOfWeekToggle(dayOfWeek as DayOfWeekName, checked)
              }
              size={20}
            />
            <StyledDayOfWeekAvailabilityFieldLabel
              active={availability.available}
            >
              {capitalize(dayOfWeek)}
            </StyledDayOfWeekAvailabilityFieldLabel>
            {copiedRules ? (
              <IconButton
                onClick={() => onPasteRules(dayOfWeek as DayOfWeekName)}
              >
                <PasteIcon />
              </IconButton>
            ) : null}
            {availability.rules.length ? (
              <IconButton onClick={() => setCopiedRules(availability.rules)}>
                <CopyIcon />
              </IconButton>
            ) : null}
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
            : renderAvailabilityRules(
                availability,
                dayOfWeek as DayOfWeekName,
                rulesAreValid
              )}
          {!rulesAreValid ? (
            <StyledInvalidRulesLabel>
              Rules cannot be duplicated or overlaping.
            </StyledInvalidRulesLabel>
          ) : null}
        </StyledDayOfWeekAvailabilityField>
      );
    });

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
