export const RESOURCE_RESERVATION_ADVANCE_UNITS: Record<
  ResourceReservationAdvanceUnit,
  string
> = {
  days: 'days',
  hours: 'hours',
  minutes: 'minutes',
  weeks: 'weeks',
};

export type ResourceReservationAdvanceUnit =
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes';
