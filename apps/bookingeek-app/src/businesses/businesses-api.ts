import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_DEV } from "../env";

export const businessesApi = createApi({
  reducerPath: "businessesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_DEV }),
  endpoints: (builder) => ({
    getBusinessById: builder.query<
      /*TODO: add business type here*/ { _id: string },
      string
    >({
      query: (id) => `businesses/${id}`,
    }),
  }),
});

export const { useGetBusinessByIdQuery } = businessesApi;
