import { authKey } from "@/constants/storageKey";
import { getNewAccessToken } from "@/services/auth.service";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios, { AxiosResponse } from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return {
      ...response,
      data: {
        data: response?.data?.data,
        meta: response?.data?.meta,
      },
    };
  },
  async function (error) {
    const config = error?.config;
    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
      return instance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong",
        errorMessages: error?.response?.data?.message,
      };
      return Promise.reject(responseObject);
    }
  }
);

export { instance };

// import Cookies from "js-cookie"; // Import the js-cookie library

// import { authKey } from "@/constants/storageKey";
// import { getNewAccessToken } from "@/services/auth.service";
// import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
// import axios from "axios";

// const instance = axios.create();
// instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers["Accept"] = "application/json";
// instance.defaults.timeout = 60000;

// // Add a request interceptor
// instance.interceptors.request.use(
//   function (config) {
//     // Do something before the request is sent
//     const accessToken = Cookies.get(authKey); // Get the access token from cookies
//     if (accessToken) {
//       config.headers.Authorization = accessToken;
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with the request error
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   //@ts-ignore
//   function (response) {
//     const responseObject: ResponseSuccessType = {
//       data: response?.data?.data,
//       meta: response?.data?.meta,
//     };
//     return responseObject;
//   },
//   async function (error) {
//     const config = error?.config;
//     if (error?.response?.status === 403 && !config?.sent) {
//       config.sent = true;
//       const response = await getNewAccessToken();
//       console.log(response);
//       const accessToken = response?.data?.accessToken;
//       config.headers["Authorization"] = accessToken;
//       // Set the access token as a cookie
//       Cookies.set(authKey, accessToken, { expires: 7 }); // You can set an appropriate expiration time
//       return instance(config);
//     } else {
//       const responseObject: IGenericErrorResponse = {
//         statusCode: error?.response?.data?.statusCode || 500,
//         message: error?.response?.data?.message || "Something went wrong",
//         errorMessages: error?.response?.data?.message,
//       };

//       return responseObject;
//     }
//   }
// );

// export { instance };
