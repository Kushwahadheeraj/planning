import { tagTypes } from "@/redux/tag-types";
import { IMeta, IPost } from "@/types";
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
      transformResponse: (response: IPost[], meta: IMeta) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    blog: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BLOGPOST_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    addBlog: build.mutation({
      query: (data) => ({
        url: "/posts/create-post",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    updateBlog: build.mutation({
      query: (data) => ({
        url: `${BLOGPOST_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
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
  useBlogsQuery,
  useBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogpostApi;
