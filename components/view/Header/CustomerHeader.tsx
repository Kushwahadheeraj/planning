
import Navbar from '@/components/ui/Navbar/Navbar'


const CustomerHeader = () => {
    // const items=[
    //   {key:"1",label:"Home",href:"/"},
    //   {key:"2",label:"My-profile",href:"my-profile"},
    //   {key:"3",label:"Booking",href:"/customer/my-booking"}
    // ]
    //const session=await getServerSession(authOptions);
  return(
  <>
  {/* <Navbar session={session? true : false} items={items} hasSider/> */}
  <Navbar hasSider/>
  </>
   )
}

export default CustomerHeader