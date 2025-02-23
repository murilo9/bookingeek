import { ReservationTimeGranularity } from "@bookingeek/api/src/resources/types";

// Retrives a list of times based on the time granularity
export const getTimesList = (
  reservationTimeGranularity: ReservationTimeGranularity
) => {
  const times: Array<{ minutesPastMidnight: number }> = [];
  let currentMinutes = 0;
  do {
    times.push({
      minutesPastMidnight: currentMinutes,
    });
    currentMinutes += reservationTimeGranularity;
  } while (currentMinutes < 60 * 24);
  return times;
};
