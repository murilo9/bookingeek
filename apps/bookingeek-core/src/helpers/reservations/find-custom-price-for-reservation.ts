import { Reservation, Resource, CustomPriceRule } from "../../types";
import { areDateDefsEqual } from "../common";

export function findCustomPriceForReservation<T>(
  reservation: Reservation<T>,
  resource: Resource<T>
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
      reservation.startDate
    );
    if (customPriceApplies && resource.availabilityType === "date-time") {
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
