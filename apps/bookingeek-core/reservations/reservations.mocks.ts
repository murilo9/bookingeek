import { RESOURCE_ID_0 } from "../resources/resources.mock";
import { Reservation } from "./types";

export function RESERVATIONS_MOCK<T>(
  Id: new (id?: string) => T
): Array<Reservation<T>> {
  return [
    {
      _id: new Id(),
      created: new Date().getTime(),
      updated: new Date().getTime(),
      IS_DELETED: false,
      cancelledBy: null,
      checkoutOptionChosen: "online",
      checkoutSessionClientId: "checkout-session-client-id",
      code: 1,
      customerData: {
        email: "david.smith@email.com",
        fullName: "David Smith",
      },
      endDate: {
        day: 15,
        month: 0,
        year: 2025,
      },
      endDateTimestamp: new Date("2025/01/15 15:00:00").getTime(),
      endTimeInMinutesPastMidnight: 60 * 15,
      extraFields: {},
      paymentStatus: "success",
      refundedAmountInCents: 0,
      resourceId: new Id(RESOURCE_ID_0),
      resourceJSON: "",
      startDate: {
        day: 15,
        month: 0,
        year: 2025,
      },
      startDateTimestamp: new Date("2025/01/15 14:00:00").getTime(),
      startTimeInMinutesPastMidnight: 60 * 14,
      stripePaymentIntentId: "",
      type: "date-time",
    },
    {
      _id: new Id(),
      created: new Date().getTime(),
      updated: new Date().getTime(),
      IS_DELETED: false,
      cancelledBy: null,
      checkoutOptionChosen: "online",
      checkoutSessionClientId: "checkout-session-client-id",
      code: 2,
      customerData: {
        email: "marcus.johnson@email.com",
        fullName: "Marcus Johnson",
      },
      endDate: {
        day: 17,
        month: 0,
        year: 2025,
      },
      endDateTimestamp: new Date("2025/01/17 09:30:00").getTime(),
      endTimeInMinutesPastMidnight: 60 * 9.5,
      extraFields: {},
      paymentStatus: "success",
      refundedAmountInCents: 0,
      resourceId: new Id(RESOURCE_ID_0),
      resourceJSON: "",
      startDate: {
        day: 17,
        month: 0,
        year: 2025,
      },
      startDateTimestamp: new Date("2025/01/17 10:30:00").getTime(),
      startTimeInMinutesPastMidnight: 60 * 10.5,
      stripePaymentIntentId: "",
      type: "date-time",
    },
  ];
}
