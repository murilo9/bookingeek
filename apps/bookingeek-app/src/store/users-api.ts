import { RetrieveUsersQuery, UpdateUserPayload, User } from "@bookingeek/core";
import { appApi } from "./store";
import { buildQueryString } from "../helpers/build-query-string";

export const usersApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<Array<User<string>>, RetrieveUsersQuery>({
      query: (query) => `/users?${buildQueryString(query)}`,
    }),
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

export const { useUpdateUserMutation, useGetUsersQuery } = usersApi;
