import { Business, UpdateBusinessPayload } from "@bookingeek/core";
import { appApi } from "./store";

export const businessesApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessById: builder.query<Business<string>, string>({
      query: (id) => `businesses/${id}`,
      providesTags: ["Business"],
    }),
    updateBusiness: builder.mutation<
      Business<string>,
      { payload: UpdateBusinessPayload; id: string }
    >({
      query: ({ payload, id }) => ({
        url: `businesses/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Business"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessByIdQuery, useUpdateBusinessMutation } =
  businessesApi;
