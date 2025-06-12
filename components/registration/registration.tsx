"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
//import UploadImage from "@/components/ui/UploadImage.tsx/UploadImage";
import { selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAddCustomerDataMutation } from "@/redux/api/customerApi";
import { customerSchema } from "@/schemas/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const RegistrationPage = () => {
  const [addCustomerData] = useAddCustomerDataMutation();
  //@ts-ignore

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    toast.loading("Creating...");
    try {
      await addCustomerData(obj);
      toast.success("Customer created successfully!");
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Registration Here</h1>

      <Form submitHandler={onSubmit} resolver={yupResolver(customerSchema)}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                type="text"
                name="customer.name.firstName"
                label="First Name"
              />
              <FormInput
                type="text"
                name="customer.name.middleName"
                label="Middle Name"
              />
              <FormInput
                type="text"
                name="customer.name.lastName"
                label="Last Name"
              />
              <FormInput
                type="password"
                name="password"
                label="Password"
              />
              <FormInput
                type="text"
                name="customer.profileImage"
                label="Profile Image"
              />
              <FormSelectField
                name="customer.gender"
                options={selectorGenderOptions}
                label="Gender"
                placeholder="Select"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                type="email"
                name="customer.email"
                label="Email address"
              />
              <FormInput
                type="text"
                name="customer.contactNo"
                label="Contact No."
              />
              <FormInput
                type="text"
                name="customer.emergencyContactNo"
                label="Emergency Contact No."
              />
              <FormDatePicker
                name="customer.dateOfBirth"
                label="Date of birth"
              />
              <FormSelectField
                name="customer.bloodGroup"
                options={selectBloodGroupOptions}
                label="Blood group"
                placeholder="Select"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" className="w-full max-w-md">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationPage;