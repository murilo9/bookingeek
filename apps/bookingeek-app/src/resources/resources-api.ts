import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_DEV } from "../env";
import { Resource } from "@bookingeek/api/src/resources/types";

export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_DEV }),
  endpoints: (builder) => ({
    getResources: builder.query<Array<Resource<string>>, string>({
      query: (businessId: string) => `resources?businessId=${businessId}`,
    }),
  }),
});

export const { useGetResourcesQuery } = resourcesApi;
