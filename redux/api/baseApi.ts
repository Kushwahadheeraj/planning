// import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
// import { getBaseUrl } from "@/helpers/config/envConfig";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { tagTypesList } from "../tag-types";

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
//   //baseQuery: fetchBaseQuery({ baseUrl: "`${process.env.BACKEND_URL}`" }),
//   endpoints: () => ({}),
//   // tagTypes: ["user"], //here we cash/store data  which was fetched
//   tagTypes: tagTypesList,
// });

import { getBaseUrl } from "@/helpers/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  //baseQuery: fetchBaseQuery({ baseUrl: "`${process.env.BACKEND_URL}`" }),
  endpoints: () => ({}),
  // tagTypes: ["user"], //here we cash/store data  which was fetched
  tagTypes: tagTypesList,
});
