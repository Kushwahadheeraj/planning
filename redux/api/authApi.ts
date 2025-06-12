// for login form
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //post for mutation,only get for query
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      transformResponse: (response: any) => {
        return {
          accessToken: response?.data?.accessToken,
          user: response?.data?.user,
        };
      },
      invalidatesTags: [tagTypes.user], //cash remove
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
