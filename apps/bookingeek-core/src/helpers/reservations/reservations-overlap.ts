export const reservationsOverlap = (
  reservation1: {
    startTimeInMinutesPastMidnight: number;
    endTimeInMinutesPastMidnight: number;
  },
  reservation2: {
    startTimeInMinutesPastMidnight: number;
    endTimeInMinutesPastMidnight: number;
  },
): boolean => {
  // TODO: give better names for these logical variables
  const free1 =
    reservation1.endTimeInMinutesPastMidnight <=
    reservation2.startTimeInMinutesPastMidnight;
  const free2 =
    reservation2.endTimeInMinutesPastMidnight <=
    reservation1.startTimeInMinutesPastMidnight;
  return free1 || free2;
};
