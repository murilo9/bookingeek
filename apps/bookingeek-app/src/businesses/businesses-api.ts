import { Business } from "@bookingeek/api/src/businesses/types";
import { appApi } from "../store";

export const businessesApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessById: builder.query<Business<string>, string>({
      query: (id) => `businesses/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessByIdQuery } = businessesApi;
