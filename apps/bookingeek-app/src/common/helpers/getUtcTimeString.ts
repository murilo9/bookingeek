// Returns a time string ('hh:mm am/pm') from a date's UTC time
export const getUtcTimeString = (date: Date, militaryFormat?: boolean) => {
  const militaryTime = date.toISOString().split("T")[1].slice(0, 5);
  const timeArray = militaryTime.split(":");
  const hours = Number(timeArray[0]);
  let amPmTime: string;
  if (militaryFormat) {
    return militaryTime;
  }
  if (hours > 12) {
    const adjustedHours = Number(timeArray[0]) - 12;
    amPmTime = [adjustedHours, timeArray[1]].join(":") + " pm";
  } else {
    amPmTime = militaryTime + " am";
  }
  return amPmTime;
};
