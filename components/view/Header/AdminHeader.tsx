
import Navbar from '@/components/ui/Navbar/Navbar'


const AdminHeader =() => {
   //   const items=[
   //    {key:"1",label:"Admin",href:"/admin"},
   //    {key:"2",label:"Profile",href:"/admin/my-profile"},
   //     {key:"3",label:"Department",href:"/admin/department"}
   //  ]
   // const session=await getServerSession(authOptions);
  return (
  <>
  <Navbar hasSider/>
  {/* <Navbar session={session? true : false} items={items} hasSider/> */}
  </>
   )
  
}

export default AdminHeader