import { ICustomer, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CUSTOMER_URL = "/customers";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCustomerData: build.mutation({
      query: (data) => ({
        url: "/users/create-customer",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.customer],
    }),

    customers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CUSTOMER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICustomer[], meta: IMeta) => {
        return {
          customer: response,
          meta,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    customer: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customer],
    }),
    updateCustomer: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.customer],
    }),
  }),
});

export const {
  useCustomerQuery,
  useAddCustomerDataMutation,
  useCustomersQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
