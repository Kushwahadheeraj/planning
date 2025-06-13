"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await userLogin(data).unwrap();
      if (res?.accessToken) {
        storeUserInfo({ accessToken: res.accessToken });
        router.push("/");
        toast.success("User logged in successfully!");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Login to your account</h1>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Link 
              href="/sign-up" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Do not have an account? Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

















// "use client"
// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';



// type FieldType = {
//   //email?: string;
//   id?:string;
//   password?: string;
// };

// const Login = () => {
//     const router =useRouter();
//     const onFinish = async(values: any) => {
//   console.log('Success:', values);
//   const result =await signIn("event-management-backend",{
//     id:values.id,
//     password:values.password,
//     //callbackUrl:"/",
//     redirect:false
//   })
//  // console.log(result)
//   if(result?.ok && !result.error ){
//     router.push("/")
//    // router.refresh()
//   }
// };

// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };
// return(
//     <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item<FieldType>
//     //   label="Email"
//     //   name="email"
//       label="User Id"
//       name="id"
//       rules={[{ required: true, message: 'Please input your user Id!' }]}
//     >
//       {/* <Input type='email'/> */}
//     <Input/>
//     </Form.Item>

//     <Form.Item<FieldType>
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: 'Please input your password!' }]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// )
  
// };

// export default Login;