import { appApi } from "../store";
import { CreateReservationDto } from "@bookingeek/api/src/reservations/dto/create-reservation.dto";
import { RetrieveReservationsQuery } from "@bookingeek/api/src/reservations/queries/retrieve-reservations-query";
import { Reservation } from "@bookingeek/api/src/reservations/types";
import { buildQueryString } from "../common/helpers/build-query-string";

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
      CreateReservationDto
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
