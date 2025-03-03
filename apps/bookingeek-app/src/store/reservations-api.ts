import { buildQueryString } from "../helpers/build-query-string";
import { appApi } from "./store";
import {
  Reservation,
  RetrieveReservationsQuery,
  CreateReservationPayload,
} from "@bookingeek/core";

export const reservationsApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query<
      Array<Reservation<string>>,
      RetrieveReservationsQuery
    >({
      query: (params) => `/reservations?${buildQueryString(params)}`,
    }),
    createReservation: builder.mutation<
      Reservation<string>,
      CreateReservationPayload
    >({
      query: (dto) => ({
        url: "reservations",
        method: "POST",
        body: dto,
      }),
      invalidatesTags: ["Reservation"],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateReservationMutation, useGetReservationsQuery } =
  reservationsApi;
