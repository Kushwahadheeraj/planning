import { IBooking, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBookingData: build.mutation({
      query: (data: any) => ({
        url: "/users/create-Booking",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    bookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BOOKING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),
    booking: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // updateBooking: build.mutation({
    //   query: (data: { id: any; body: any }) => ({
    //     url: `${BOOKING_URL}/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.booking],
    // }),
    confirmBooking: build.mutation({
      query: (id: any) => ({
        url: `${BOOKING_URL}/confirm/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    deleteBooking: build.mutation({
      query: (id: any) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useBookingQuery,
  useAddBookingDataMutation,
  useBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  useConfirmBookingMutation,
} = bookingApi;
