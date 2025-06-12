import { tagTypes } from "@/redux/tag-types";
import { IDepartment, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const DEPARTMENT_URL = "/management-departments";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    departments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: DEPARTMENT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IDepartment[], meta: IMeta) => {
        return {
          departments: response,
          meta,
        };
      },
      providesTags: [tagTypes.department],
    }),
    // get single academic department
    department: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.department],
    }),
    // create a new academic department
    addDepartment: build.mutation({
      query: (data) => ({
        url: "/management-departments/create-department",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.department],
    }),
    // update ac department
    updateDepartment: build.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.department],
    }),

    // delete ac department
    deleteDepartment: build.mutation({
      query: (id) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.department],
    }),
  }),
});

export const {
  useAddDepartmentMutation,
  useDepartmentsQuery,
  useDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
