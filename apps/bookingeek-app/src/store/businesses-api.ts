import { Business, UpdateBusinessPayload } from "@bookingeek/core";
import { appApi } from "./store";

export const businessesApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessByIdOrSlug: builder.query<Business<string>, string>({
      query: (idOrSlug) => `businesses/${idOrSlug}`,
      providesTags: ["Business"],
    }),
    updateBusiness: builder.mutation<
      Business<string>,
      { payload: UpdateBusinessPayload; idOrSlug: string }
    >({
      query: ({ payload, idOrSlug }) => ({
        url: `businesses/${idOrSlug}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Business"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessByIdOrSlugQuery, useUpdateBusinessMutation } =
  businessesApi;
