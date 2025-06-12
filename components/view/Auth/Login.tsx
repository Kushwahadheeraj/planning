"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import { SubmitHandler } from "react-hook-form";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import logi from '../../../../public/Security On-cuate.svg';
import conte from '../../styles/singleproduct.module.css';
import Link from "next/link";
import { toast } from "sonner";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.accessToken) {
        storeUserInfo({ accessToken: res?.accessToken });
        const {role} = getUserInfo() as any;
        router.push(`${role}/my-profile`);
        toast.success("User logged in successfully!");
      }
      if (!res?.accessToken) {
        toast.error("User did not logged in!");
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <Image src={logi} width={400} height={300} alt="login image" className="w-full max-w-md" />
        </div>
        
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">First login your account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
              <div className="space-y-4">
                <FormInput 
                  name="id" 
                  type="text" 
                  label="User Id" 
                  required 
                />
                
                <FormInput
                  name="password"
                  type="password"
                  label="User Password"
                  required
                />
                
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </Form>
            
            <div className="mt-4 text-right">
              <Link 
                href="/" 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Please Register Here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
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