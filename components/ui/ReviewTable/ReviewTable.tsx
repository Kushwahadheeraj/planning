"use client"
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useAddReviewMutation, useReviewQuery } from "@/redux/api/reviewApi";
import { Button, Card, Col, Rate, Row, message } from "antd";
import GetAllReview from "../GetAllReview/GetAllReview";
import { useCategoryQuery } from "@/redux/api/categoryApi";
import Meta from "antd/es/card/Meta";
import { getUserInfo } from "@/services/auth.service";
import { useCustomersQuery } from "@/redux/api/customerApi";


const ReviewTable = ({categoryId,reviewIds}:{categoryId:string,reviewIds:[]}) => {
 const query: Record<string, any> = {};
  const { data, isLoading } = useCustomersQuery({ ...query });
  
  const customers:any = data?.customer?.map((dam:any)=>dam?.id);
    console.log(customers)
  const {role,userId}=getUserInfo() as any;

const customersd: any = data?.customer?.map((dam:any) => {
  if (dam?.id === userId) {
    return dam;
  }
}).filter(Boolean);
console.log(customersd)
const cusId= customersd?.map((cust:any)=>cust?._id)
const email= customersd?.map((cust:any)=>cust?.email)

const cusIdString = cusId?.join(',');
console.log(cusIdString)
// const cuidString= cusId[0]
// console.log(cuidString)
const [addReview]=useAddReviewMutation()
   const onSubmit = async (values: any) => {
    const object = { ...values };
    message.loading("Creating.....");
    try {
      console.log(object);
        await addReview(object);
      // console.log("fetchdata(obj):",addReview(object))
      message.success("Review added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
    const defaultValues = {   
     categoryId,
    // customerId:"652ae59b3924742d294e13d8",
     customerId:cusIdString,
  };
  console.log(defaultValues)
  return (
    <>
   <div>
       <h1>ReviewTable</h1>

       <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        
         <Row style={{display:"block"}} gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
         
            <Col span={12} style={{ margin: "10px 0" }}>
             <FormInput name="rating" label="Rating" />  
           </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
             <FormInput name="comment" label="Comment" />
           </Col>
         </Row>
         <Button type="primary" htmlType="submit">
           Review
         </Button>
       </Form>
       <GetAllReview/>
     </div> 
     <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px',}}>
  <Row gutter={6} style={{margin:0}} >
   
{reviewIds?.map((data: any) => (
  <Col span={16}  key={data?.id} style={{margin:0}}>
  <Card
    title={''}
    hoverable
  >
    <Meta title={ <p>User Id: {` `}{data?.customerId}</p>}
 />
    <p>Comments: {` `}{data?.comment}</p>
    <Rate allowHalf defaultValue={data?.rating} />
    <p>Rating:{data?.rating}</p>
  </Card>
</Col>
))}
 
  </Row>
 </div>
    </>

  )
}

export default ReviewTable