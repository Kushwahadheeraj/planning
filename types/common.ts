export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
  status?: any;
  message?: any;
  success?: any;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IDepartment {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ICustomer {
  id: string;
  name: Name;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: string;
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: string;
  notification: { message: string }[];
  booking: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export type IReview = {
  customerId: string;
  categoryId: string;
  rating: string;
  comment: string;
};
export type IFeedback = {
  customerName: string;
  customerImage: string;
  comment: string;
  rating: string;
};
export type IPost = {
  adminId: string;
  imagepost?: string;
  comment: string;
};
export type IService = {
  x: 1;
  //[x: string]: Key | null | undefined;
  id: string;
  role: string;
  name: string;
  price: string;
  details: string;
  location: string;
  profileImage: string;
  startTime?: string;
  endTime?: string;
  apointmentdaysInWeek?: string;
  categoryIds: string[];
};
export interface ICategory {
  id: string;
  role: string;
  serviceID: string;
  name: string;
  profileImage: string;
  details: string;
  reviewIds: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IBookingRequest {
  categoryId: string;
  bookimage?: string;
  startTime: string;
  endTime: string;
  apointmentdaysInWeek?: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IBooking {
  id: string;
  role: string;
  customerID: string;
  serviceIDs: IBookingRequest[];
  isConfirm: boolean;
  adminID: string;
  notification: { message: string }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Name {
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface IAdmin {
  _id: any;
  id: string;
  name: Name;
  profileImage?: string;
  gender: string;
  managementDepartment: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  dateOfBirth: string;
  bloodGroup: string;
  designation: string;
  presentAddress: string;
  permanentAddress: string;
  notification?: {
    message: string;
    booking: IBooking[];
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
