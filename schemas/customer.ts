import * as yup from "yup";

export const customerSchema = yup.object().shape({
  password: yup.string().min(6).max(32).required(),
  customer: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      middleName: yup.string().required("Middle name is required"),
      lastName: yup.string().required("Last name is required"),
    }),
    email: yup.string().email().required("Email is required"),
    contactNo: yup.string().required("Email is required"),
    gender: yup.string().required("Email is required"),
    presentAddress: yup.string().required("Email is required"),
  }),
});
