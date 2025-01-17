import { UpdateResourceDto } from "@bookingeek/api/src/resources/dto/update-resource.dto";
import { CreateResourceDto } from "@bookingeek/api/src/resources/dto/create-resource.dto";
import { appApi } from "../store";
import { Resource } from "@bookingeek/api/src/resources/types";

export const resourcesApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<Array<Resource<string>>, string>({
      query: (businessId: string) => `resources?businessId=${businessId}`,
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
