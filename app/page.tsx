/* eslint-disable @next/next/no-img-element */
"use client"
import Carosol from "@/components/view/Carosol/Carosol";
import PublicHeader from "@/components/view/Header/PublicHeader";
import { useBlogsQuery } from "@/redux/api/blogApi";
import { Card, CardContent} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import RegistrationPage from "@/components/registration/registration";
import FooterPage from "@/components/Footer/footer";
import ServicePage from "@/components/servicepage/servicepage";
import { useFeedbacksQuery } from "@/redux/api/feedbackApi";
import unhh from '../components/styles/singleproduct.module.css'

export default function Home() {
  const query: Record<string, any> = {};
  const {data} = useBlogsQuery({ ...query })
  const {data:feedback} = useFeedbacksQuery({})
  const feedbacks = feedback?.feedbacks

  return (
    <main className="min-h-screen">
      <PublicHeader/>
      
      <Carosol/>
      
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Important Announcement</h1>
        
        <div className="grid gap-6">
          {data?.blogs?.map((categorydata:any, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className={unhh.container}>
                  <div className="relative w-full h-[300px]">
                    <Image 
                      alt="example" 
                      src={categorydata?.imagepost} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-lg">{categorydata?.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ServicePage/>
      <RegistrationPage/>
      
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">User Feedback</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks?.slice(0, 3).map((categorydata:any, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-[100px] w-[100px]">
                    <AvatarImage 
                      src={categorydata?.customerImage} 
                      alt={categorydata?.customerName}
                    />
                    <AvatarFallback>
                      {categorydata?.customerName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-lg">{categorydata?.comment}</p>
                    <Separator className="my-4" />
                    <p className="font-semibold">{categorydata?.customerName}</p>
                    <div className="flex justify-end mt-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                          <span 
                            key={index} 
                            className={`text-2xl ${
                              index < Math.floor(categorydata?.rating) 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <FooterPage/>
    </main>
  )
}
