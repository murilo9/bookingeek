import { TimeRange } from "@bookingeek/core";

const rulesDontOverlap = (ruleA: TimeRange, ruleB: TimeRange) =>
  ruleA.startTimeInMinutesPastMidnight >= ruleB.endTimeInMinutesPastMidnight ||
  ruleB.startTimeInMinutesPastMidnight >= ruleA.endTimeInMinutesPastMidnight;

/**
 * Checks if a list of rules contains invalid, duplicated or overlaping rules.
 */
export const validateAvailablilityRulesList = (rules: Array<TimeRange>) => {
  const invalidRuleExists = rules.find(
    (rule) =>
      rule.startTimeInMinutesPastMidnight >= rule.endTimeInMinutesPastMidnight
  );
  const overlappingRuleExists = rules.find(
    (comparingRule, comparingRuleIndex) => {
      const overlapsWith = rules.find(
        (rule, ruleIndex) =>
          ruleIndex !== comparingRuleIndex &&
          !rulesDontOverlap(rule, comparingRule)
      );
      return overlapsWith;
    }
  );
  const valuesList = rules.map((rule) => JSON.stringify(rule));
  const isDuplicate = valuesList.some(
    (rule, idx) => valuesList.indexOf(rule) != idx
  );

  return !(isDuplicate || invalidRuleExists || overlappingRuleExists);
};
