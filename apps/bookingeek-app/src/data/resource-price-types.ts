import { ReservationTimeGranularity } from "@bookingeek/core";

export const RESOURCE_PRICE_TYPES: Record<string, ReservationTimeGranularity> =
  {
    hourly: 60,
    "30 min": 30,
    "15 min": 15,
    "10 min": 10,
    "5 min": 5,
  };
