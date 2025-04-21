import { appApi } from "./store";
import { buildQueryString } from "../helpers/build-query-string";
import {
  CreateResourcePayload,
  Resource,
  RetrieveResourceAvailabilityQuery,
  RetrieveResourceAvailabilityResponse,
  RetrieveResourcesQuery,
  UpdateResourcePayload,
} from "@bookingeek/core";
import cookies from "js-cookie";

export const resourcesApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<
      Array<Resource<string>>,
      RetrieveResourcesQuery
    >({
      query: (params) => `resources?${buildQueryString(params)}`,
      providesTags: ["Resource"],
    }),
    updateResource: builder.mutation<
      Resource<string>,
      { dto: UpdateResourcePayload; id: string }
    >({
      query: ({ id, dto }) => ({
        url: `resources/${id}`,
        method: "PUT",
        body: dto,
      }),
      invalidatesTags: ["Resource"],
    }),
    createResource: builder.mutation<Resource<string>, CreateResourcePayload>({
      query: (dto) => ({
        url: "resources",
        method: "POST",
        body: dto,
        headers: {
          authorization: cookies.get("access_token"),
        },
      }),
      invalidatesTags: ["Resource"],
    }),
    getResourceMonthAvailability: builder.query<
      RetrieveResourceAvailabilityResponse<string>,
      { resourceId: string } & RetrieveResourceAvailabilityQuery
    >({
      query: ({ resourceId, year, month }) =>
        `resources/${resourceId}/availability?${buildQueryString({ year, month })}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetResourcesQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useGetResourceMonthAvailabilityQuery,
  useLazyGetResourceMonthAvailabilityQuery,
} = resourcesApi;
