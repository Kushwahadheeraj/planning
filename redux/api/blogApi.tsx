import { tagTypes } from "@/redux/tag-types";
import { IDepartment, IMeta, IPost, IReview } from "@/types";
import { baseApi } from "./baseApi";

const BLOGPOST_URL = "/posts";

export const blogpostApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
   
    blogs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BLOGPOST_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response:IPost [], meta: IMeta) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    // get single academic department
    blog: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BLOGPOST_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    // create a new academic department
    addBlog: build.mutation({
      query: (data) => ({
        url: "/posts/create-post",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // update ac department
    updateBlog: build.mutation({
      query: (data) => ({
        url: `${BLOGPOST_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // delete ac department
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${BLOGPOST_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useDeleteBlogMutation,
  useBlogQuery,
  useBlogsQuery,
  useUpdateBlogMutation,
} = blogpostApi;
