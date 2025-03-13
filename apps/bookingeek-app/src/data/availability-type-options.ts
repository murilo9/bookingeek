// Options for choosing a resource's availability type
export const AVAILABILITY_TYPE_OPTIONS: Array<{
  label: string;
  value: "date-time" | "date-only";
}> = [
  {
    label: "Date & Time",
    value: "date-time",
  },
  {
    label: "Date Only",
    value: "date-only",
  },
];
