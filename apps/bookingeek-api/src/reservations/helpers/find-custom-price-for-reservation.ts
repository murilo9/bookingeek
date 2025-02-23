import { Reservation } from '../types';
import { CustomPriceRule, Resource } from 'src/resources/types';
import { areDateDefsEqual } from 'src/common/helpers/are-date-defs-equal';

export function findCustomPriceForReservation<T>(
  reservation: Reservation<T>,
  resource: Resource<T>,
): CustomPriceRule | null {
  let customPriceApplied: CustomPriceRule | null = null;
  resource.customPrices.forEach((customPrice) => {
    const { startTimeInMinutesPastMidnight, endTimeInMinutesPastMidnight } =
      reservation;
    const { day, month } = customPrice;
    const customPriceDateDef = {
      day,
      month,
      year: new Date().getFullYear(),
    };
    const customPriceApplies = areDateDefsEqual(
      customPriceDateDef,
      reservation.startDate,
    );
    // TODO: check resource availabilit type (date-only or date-time)
    if (customPriceApplies) {
      customPrice.times.forEach((customTime) => {
        const customTimeApplies =
          customTime.startInMinutesPastMidnight <=
            startTimeInMinutesPastMidnight &&
          customTime.endInMinutesPastMidnight >= endTimeInMinutesPastMidnight;
        if (customTimeApplies) {
          customPriceApplied = customPrice;
        }
      });
    }
  });
  return customPriceApplied;
}
