import { CustomPriceRule } from 'src/resources/types';
import { DateDef } from '../types/date-def';
import { areDateDefsEqual } from 'src/common/helpers/are-date-defs-equal';

/**
 * Returns whether a price rule applies to a desired date-time range (usually from a reservation intent).
 * @param priceRule The price rule.
 * @param dateDef The date-time date def.
 * @param startInMinutesPastMidnight The date-time start time.
 * @param endInMinutesPastMidnight The date-time end time.
 */
export const customPriceRuleMatchesDateTime = (
  priceRule: CustomPriceRule,
  dateDef: DateDef,
  startInMinutesPastMidnight: number,
  endInMinutesPastMidnight: number,
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
      timeRule.startInMinutesPastMidnight <= startInMinutesPastMidnight &&
      timeRule.endInMinutesPastMidnight >= endInMinutesPastMidnight,
  );
  return dateMatches && Boolean(timeMatches);
};
