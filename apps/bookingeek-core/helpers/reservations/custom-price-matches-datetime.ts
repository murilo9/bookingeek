import { CustomPriceRule, DateDef } from "../../types";
import { areDateDefsEqual } from "../common";

/**
 * Returns whether a price rule applies to a desired date-time range (usually from a reservation intent).
 * @param priceRule The price rule.
 * @param dateDef The date-time date def.
 * @param startTimeInMinutesPastMidnight The date-time start time.
 * @param endTimeInMinutesPastMidnight The date-time end time.
 */
export const customPriceRuleMatchesDateTime = (
  priceRule: CustomPriceRule,
  dateDef: DateDef,
  startTimeInMinutesPastMidnight: number,
  endTimeInMinutesPastMidnight: number
): boolean => {
  const { day, month } = priceRule;
  const priceRuleDateDef = {
    year: new Date().getFullYear(),
    month,
    day,
  };
  const dateMatches = areDateDefsEqual(priceRuleDateDef, dateDef);
  const timeMatches = priceRule.times.find(
    (timeRule) =>
      timeRule.startTimeInMinutesPastMidnight <=
        startTimeInMinutesPastMidnight &&
      timeRule.endTimeInMinutesPastMidnight >= endTimeInMinutesPastMidnight
  );
  return dateMatches && Boolean(timeMatches);
};
