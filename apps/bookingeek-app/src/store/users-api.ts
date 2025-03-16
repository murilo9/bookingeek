import { UpdateUserPayload, User } from "@bookingeek/core";
import { appApi } from "./store";

export const usersApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<
      User<string>,
      { payload: UpdateUserPayload; id: string }
    >({
      query: ({ payload, id }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateUserMutation } = usersApi;
