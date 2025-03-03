import { useState } from "react";
import styled from "styled-components";
import { useHandleRequestCall } from "../hooks/handle-request-call";
import { useOutletContext } from "react-router";
import { MONTHS } from "../data/months";
import AvailabilityRangeRuleForm from "../components/domain/availability-time-rule-form";
import { useUpdateResourceMutation } from "../store/resources-api";
import { useFormComparator } from "../hooks/useFormComparator";
import {
  Resource,
  CustomPriceRule,
  TimeRange,
  UpdateResourcePayload,
} from "@bookingeek/core";
import Button from "../components/common/button";
import IconButton from "../components/common/icon-button";
import Input from "../components/common/input";
import Select from "../components/common/select";
import AddIcon from "../components/icons/add/add";
import CloseIcon from "../components/icons/close/close";
import CopyIcon from "../components/icons/copy/copy";
import DeleteIcon from "../components/icons/delete/delete";
import PasteIcon from "../components/icons/paste/paste";
import { COLORS } from "../data/colors";
import { deepCopy } from "../helpers/deep-copy";
import { onFormatNumber } from "../helpers/on-format-number";

const StyledForm = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 640px;
`;

const StyledTitleLabel = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const StyledEmptyRulesText = styled.p`
  font-style: italic;
  text-align: center;
`;

const StyledRuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #e4e4e4;
  padding: 16px;
  border-radius: 8px;
`;

const StyledRuleDayRow = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledRuleDayRowButtonContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const StyledIconButton = styled(Button)`
  width: 40px;
`;

const StyledSaveButton = styled(Button)`
  @media screen and (min-width: 768px) {
    align-self: flex-start;
  }
`;

export default function ResourceUnavailabilityView() {
  const handleRequestCall = useHandleRequestCall();
  const resource = useOutletContext<Resource<string>>();
  const [updateResource, updateData] = useUpdateResourceMutation();
  const [unavailabilityRules, setUnavailabilityRules] = useState<
    Array<CustomPriceRule>
  >(resource.unavailability);
  const isSaving = updateData.isLoading;
  const canPaste = false; // TODO: implement this
  const { formChanged } = useFormComparator({
    unavailabilityRules,
  });
  const availabilityIsDateOnly = resource.availabilityType === "date-only";

  const onSaveClick = async () => {
    const dto: UpdateResourcePayload = {
      ...resource,
      unavailability: unavailabilityRules,
    };
    const requestCall = await updateResource({ dto, id: resource._id });
    handleRequestCall(requestCall, "Changes saved successfully.");
  };

  const onRuleChange = (value: CustomPriceRule, index: number) => {
    const updatedUnvavailabilityRules = [...unavailabilityRules];
    updatedUnvavailabilityRules.splice(index, 1, value);
    setUnavailabilityRules(updatedUnvavailabilityRules);
  };

  const onAddRuleClick = () => {
    const updatedUnvavailabilityRules = [...unavailabilityRules];
    const now = new Date();
    updatedUnvavailabilityRules.push({
      day: now.getDate(),
      month: now.getMonth(),
      times: [
        {
          startInMinutesPastMidnight: now.getHours() * 60,
          endInMinutesPastMidnight:
            now.getHours() * 60 + resource.reservationTimeGranularityMinutes,
        },
      ],
      priceInCents: 0,
    });
    setUnavailabilityRules(updatedUnvavailabilityRules);
  };

  const onRemoveRuleClick = (index: number) => {
    const updatedUnvavailabilityRules = [...unavailabilityRules];
    updatedUnvavailabilityRules.splice(index, 1);
    setUnavailabilityRules(updatedUnvavailabilityRules);
  };

  const onRemoveRuleTimeRangeClick = (
    ruleIndex: number,
    timeRangeIndex: number
  ) => {
    const updatedUnvavailabilityRules = deepCopy(unavailabilityRules);
    const updatedRule = updatedUnvavailabilityRules[ruleIndex];
    const updatedTimeRanges = [...updatedRule.times];
    updatedTimeRanges.splice(timeRangeIndex, 1);
    updatedRule.times = updatedTimeRanges;
    updatedUnvavailabilityRules.splice(ruleIndex, 1, updatedRule);
    setUnavailabilityRules(updatedUnvavailabilityRules);
  };

  const onAddRuleTimeRangeClick = (ruleIndex: number) => {
    const updatedUnvavailabilityRules = [...unavailabilityRules];
    const updatedRule = updatedUnvavailabilityRules[ruleIndex];
    const now = new Date();
    updatedRule.times.push({
      startInMinutesPastMidnight: now.getHours() * 60,
      endInMinutesPastMidnight:
        now.getHours() * 60 + resource.reservationTimeGranularityMinutes,
    });
    updatedUnvavailabilityRules.splice(ruleIndex, 1, updatedRule);
    setUnavailabilityRules(updatedUnvavailabilityRules);
  };

  const onRuleTimeRangeChange = (
    value: TimeRange,
    timeRangeIndex: number,
    ruleIndex: number
  ) => {
    const updatedUnvavailabilityRules = [...unavailabilityRules];
    const updatedRule = updatedUnvavailabilityRules[ruleIndex];
    updatedRule.times.splice(timeRangeIndex, 1, value);
    updatedUnvavailabilityRules.splice(ruleIndex, 1, updatedRule);
    setUnavailabilityRules(updatedUnvavailabilityRules);
  };

  return (
    <>
      <StyledForm>
        <div>
          <StyledTitleLabel>Schedule Unavailability</StyledTitleLabel>
          <p>Set specific dates where your availability will change</p>
        </div>
        {unavailabilityRules.length ? (
          unavailabilityRules.map((rule, ruleIndex) => (
            <StyledRuleContainer>
              <StyledRuleDayRow>
                <Select
                  value={rule.month}
                  onChange={({ target: { value } }) =>
                    onRuleChange({ ...rule, month: Number(value) }, ruleIndex)
                  }
                >
                  {MONTHS.map((month, monthIndex) => (
                    <option value={monthIndex}>{month}</option>
                  ))}
                </Select>
                <Input
                  value={rule.day.toString()}
                  onChange={({ target: { value } }) =>
                    onFormatNumber(
                      value,
                      (day: number) =>
                        onRuleChange({ ...rule, day }, ruleIndex),
                      31
                    )
                  }
                />
                <StyledRuleDayRowButtonContainer>
                  <IconButton disabled>
                    <CopyIcon />
                  </IconButton>
                  <IconButton onClick={() => onRemoveRuleClick(ruleIndex)}>
                    <DeleteIcon color={COLORS.danger} />
                  </IconButton>
                  {availabilityIsDateOnly ? null : (
                    <IconButton
                      onClick={() => onAddRuleTimeRangeClick(ruleIndex)}
                    >
                      <AddIcon color={COLORS.text} />
                    </IconButton>
                  )}
                </StyledRuleDayRowButtonContainer>
              </StyledRuleDayRow>
              {rule.times.map((timeRange, timeRangeIndex) =>
                availabilityIsDateOnly ? null : (
                  <AvailabilityRangeRuleForm
                    key={timeRangeIndex}
                    onRemoveClick={() =>
                      onRemoveRuleTimeRangeClick(ruleIndex, timeRangeIndex)
                    }
                    onChange={(value) =>
                      onRuleTimeRangeChange(value, timeRangeIndex, ruleIndex)
                    }
                    reservationTimeGranularityMinutes={
                      resource.reservationTimeGranularityMinutes
                    }
                    reservationTimeType={resource.reservationTimeType}
                    timeRange={timeRange}
                    customDeleteIcon={<CloseIcon color={COLORS.danger} />}
                  />
                )
              )}
            </StyledRuleContainer>
          ))
        ) : (
          <StyledEmptyRulesText>No rules set</StyledEmptyRulesText>
        )}
        <StyledButtonsContainer>
          <Button
            variant="secondary"
            startSlot={<AddIcon />}
            onClick={onAddRuleClick}
          >
            Add Day
          </Button>
          <StyledIconButton variant="secondary" disabled={!canPaste}>
            <PasteIcon size={20} />
          </StyledIconButton>
        </StyledButtonsContainer>
        <StyledSaveButton
          onClick={onSaveClick}
          disabled={!formChanged || isSaving}
        >
          Save Changes
        </StyledSaveButton>
      </StyledForm>
    </>
  );
}
