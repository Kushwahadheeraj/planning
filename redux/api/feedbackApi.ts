import { tagTypes } from "@/redux/tag-types";
import { IDepartment, IFeedback, IMeta, IReview } from "@/types";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedbacks";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    feedbacks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FEEDBACK_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFeedback[], meta: IMeta) => {
        return {
          feedbacks: response,
          meta,
        };
      },
      providesTags: [tagTypes.feedback],
    }),
    // get single academic department
    feedback: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),
    // create a new academic department
    addFeedback: build.mutation({
      query: (data) => ({
        url: "/feedbacks/create-feedback",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    // update ac department
    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    // delete ac department
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
  useFeedbackQuery,
  useFeedbacksQuery,
  useUpdateFeedbackMutation,
} = feedbackApi;
