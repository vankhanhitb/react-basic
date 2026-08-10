import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";
import type { UserInfo } from "../features/auth/authSlice";

export type LoginRequest = {
  email: string;
  password: string;
};

type LogoutResponse = {
  message: string;
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, LoginRequest>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = userApiSlice;
