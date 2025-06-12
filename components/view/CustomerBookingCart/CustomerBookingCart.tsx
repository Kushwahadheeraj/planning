"use client"
import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { Button, Card, Col, Drawer, Modal, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import Badges from '../Badge/Badge';
import { ChildProcess } from 'child_process';
import { useCustomersQuery } from '@/redux/api/customerApi';
import { useBookingsQuery, useDeleteBookingMutation } from '@/redux/api/bookingApi';
import CartBadges from '../CartBadge/CartBadge';

import { USER_ROLE } from '@/constants/role';
import { redirect } from 'next/navigation';
import EMModal from '@/components/ui/EMModel/EMModel';

const CustomerBookingCart = () => {
  const [deleteBooking]= useDeleteBookingMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartdatas, setCartDatas] = useState<any[]>([]);
  const showModal = () => {
    setIsModalOpen(true);
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
   const [deleteBookingState,setDeleteBookingState]=useState('')
   console.log(deleteBookingState)
  useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.CUSTOMER){
         redirect('/login')
    }
  },[])
  const [open, setOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

  const showDrawer = () => {
    setOpen(true);
    setBookingCount(0);
  };

  const onClose = () => {
    setOpen(false);
  };

  const query: Record<string, any> = {};
  const { data, isLoading } = useCustomersQuery({ ...query },{refetchOnMountOrArgChange:true,pollingInterval:10000});
  const {data:cartData,isLoading:loading}=useBookingsQuery({...query},{refetchOnMountOrArgChange:true,pollingInterval:10000})
  //console.log(cartData?.bookings?.map((fr:any)=>fr?.customerID?.id))

  //const customers: any = data?.customer?.map(dam => dam);
  //console.log(customers)

  const { userId,role } = getUserInfo() as any;
  console.log(userId)

  const customersd: any = data?.customer?.map((dam:any) => {
    if (dam?.id === userId) {
      return dam;
    }
  }).filter(Boolean);
//@ts-ignore
 const customerBookingreq = cartData?.bookings?.map((fr:any)=> {
    if (fr?.customerID?.id === userId) {
      return fr;
    }
  }).filter(Boolean);

console.log(customerBookingreq)
//const previous = [...customerBookingreq]
const ghdd= customerBookingreq?.map((fdh:any)=>{

const dfhdh= customerBookingreq?.filter((rtrt:any)=>rtrt !==fdh)
return dfhdh

})

console.log(ghdd)
  //const [cartItems, setNewItems] = useState([]);
//   const newcart=[]

//   const previous = newcart.push(...customerBookingreq)
//   const newCart=[...newcart,previous]
// //console.log(customerBookingreq)
// //console.log(cartItems)
// console.log(newCart.length)

// const cdItems = customerBookingreq?.map((p:any)=>p)
//  console.log(cdItems)
//  for(const custBook of customerBookingreq){
  
//   console.log(custBook)
  
//  }
 
// const newCart =[...cartItems,cdItems] as any
// setNewItems(newCart)
// console.log(cartItems)






// const [cartItems,setNewItems]=useState([])  
// useEffect(() => {
 

// const cdItems = customerBookingreq?.map((p:any)=>p)
 
// const newCart =[...cartItems,cdItems] as any
// setNewItems(newCart)
// console.log(cartItems)


// }, [cartItems, customerBookingreq]);

   


// const customerBookingreq2:any= cartData?.bookings?.map((fr:any)=> {
//     if (fr?.customerID?.id === userId) {
//       return fr;
//     }
//   }).filter(Boolean);
//   //console.log(customerBookingreq2);
//   const newCartDatas=[...cartdatas,customerBookingreq2] as any
//   setCartDatas(newCartDatas)


  // const previousBookingCount=customerBookingreq2?.filter((bd:any)=>bd);
  // console.log(previousBookingCount)
  //       setCartData(customerBookingreq2)

    
    //console.log(cartdata);



//   const customersBooking: any = customersd?.map((bok:any)=>bok.booking)
//   console.log("customersBookings:",customersBooking)

//   let customerNotifications = customersd?.map((notif: { notification: any[]; }) => notif?.notification?.map(u=>u));
//   console.log("notifiObjects",customerNotifications)
 


  const customerBookingInCard=customerBookingreq?.map((fdff:any)=>fdff)

  // useEffect(()=>{
  //  const confirmedBookingsCount = customerBookingInCard?.filter((cd: any) => cd?.bookings);
  //  setCartData(confirmedBookingsCount)

  // },[customerBookingInCard])
  // console.log(cartData)
  //const cartdatarefresh =cartData?.bookings?.length;
   const confirmedBookingsCount = customerBookingInCard?.filter((cd: any) => cd?.isConfirm === false)?.length;

console.log("Confirmed Bookings Count:", confirmedBookingsCount);
// console.log("CustomerBookingInCard:",customerBookingInCard?.map((cd:any)=>cd?.isConfirm===true))
//  const Confirmbooking=customerBookingInCard?.map((cd:any)=>cd?.isConfirm===true)
//  console.log(Confirmbooking)

const customerBookingInCardLength=confirmedBookingsCount
console.log(customerBookingInCardLength)
console.log("customerBookingInCardLength:",customerBookingInCardLength)
  useEffect(() => {
    if (!open) {
      setBookingCount(customerBookingInCardLength as number);
    } else {
      setBookingCount(0);
    }
  }, [open, customerBookingInCardLength]);


  useEffect(() => {
    if (!open) {
      setBookingCount(0);
    }
  }, [open]);
   useEffect(() => {
     if(isLoggedIn() || !isLoggedIn || role === USER_ROLE.CUSTOMER){
         setBookingCount(customerBookingInCardLength as number);
    }
  }, [customerBookingInCardLength, role]);

const isNotConfirmedBookingsCart = customerBookingInCard?.filter((cd: any) =>{
     if(cd.isConfirm===false){
      return cd
     }
});
 console.log(isNotConfirmedBookingsCart)

  const deleteBookingHandler = async (id: string) => {
    console.log(id)
    try {
      const res = await deleteBooking(id);
      console.log(res)
      if (res) {
        message.success("Booking Successfully Deleted!");

        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };


  return (
   
  <>
    
    <div>
      
      <p onClick={showDrawer}><CartBadges messageCount={bookingCount} /></p>
      <Drawer title="Service History" placement="right" onClose={onClose} open={open}>
        
        {isNotConfirmedBookingsCart?.map((cartbok:any) =>(
          <Col span={8} key={cartbok?.id} style={{ margin: 0 }}>
            <Card
              hoverable
              style={{ width: 320, justifyContent: 'center', display: 'flex' }}
            >
              <Meta title=""/>
              <p>{cartbok?.isConfirm===true? "Booking Confirm: true" : "Booking Confirm: false" }</p>
              <p>Booking Id: {cartbok?.id}</p>
              <p>Booking Create:{cartbok?.createdAt}</p>
              {/* <Button onClick={()=>setDeleteBookingState(cartbok?._id)}>delete
              </Button> */}
        <Button type="primary" onClick={showModal}>Cancel Booking</Button>
        <Modal title="Remove Booking" open={isModalOpen} onOk={()=>deleteBookingHandler(cartbok?.id) } onCancel={handleCancel}>
        <p className="my-5">Do you want to remove this booking?</p>
      </Modal>
         
            </Card>
          </Col>
        ))}
      </Drawer>
      
    </div>
        
    </>
  );
}

export default CustomerBookingCart;



