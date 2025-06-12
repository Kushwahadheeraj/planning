import { tagTypes } from "@/redux/tag-types";
import { ICategory, IMeta, IService } from "@/types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/categories";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SERVICE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICategory[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
    // get single academic department
    service: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
    // create a new academic department
    addService: build.mutation({
      query: (data) => ({
        url: "/categories/create-category",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    // update ac department
    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    // delete ac department
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useServiceQuery,
  useServicesQuery,
} = serviceApi;
