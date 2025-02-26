import { appApi } from "../store";
import { buildQueryString } from "../common/helpers/build-query-string";
import {
  Resource,
  UpdateResourceDto,
  CreateResourceDto,
  RetrieveResourcesQuery,
} from "@bookingeek/core";

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
      { dto: UpdateResourceDto; id: string }
    >({
      query: ({ id, dto }) => ({
        url: `resources/${id}`,
        method: "PUT",
        body: dto,
      }),
      invalidatesTags: ["Resource"],
    }),
    createResource: builder.mutation<Resource<string>, CreateResourceDto>({
      query: (dto) => ({
        url: "resources",
        method: "POST",
        body: dto,
      }),
      invalidatesTags: ["Resource"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetResourcesQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
} = resourcesApi;
