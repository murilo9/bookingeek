import { appApi } from "../store";

export const businessesApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessById: builder.query<
      /*TODO: add business type here*/ { _id: string },
      string
    >({
      query: (id) => `businesses/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessByIdQuery } = businessesApi;
