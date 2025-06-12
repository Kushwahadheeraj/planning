import { baseApi } from "./api/baseApi";
import sidebarReducer from "./slices/sidebarSlice";
export const reducer = {
  sidebar: sidebarReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
