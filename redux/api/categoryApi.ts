import { tagTypes } from "@/redux/tag-types";
import { IMeta, IService } from "@/types";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/services";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    categories: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          categories: response,
          meta,
        };
      },
      providesTags: [tagTypes.category],
    }),
    // get single academic department
    category: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    // create a new academic department
    addCategory: build.mutation({
      query: (data) => ({
        url: "/services/create-service",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    // update ac department
    updateCategory: build.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    // delete ac department
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useCategoriesQuery,
  useCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
