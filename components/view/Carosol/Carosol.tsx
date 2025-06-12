/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const images = [
    'https://tandteventplanning.com/wp-content/uploads/2019/09/categories-of-event.png',
    // 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fevent&psig=AOvVaw0rTrGy-UyY-lfFny6BMf2U&ust=1749797356130000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCwvaCl640DFQAAAAAdAAAAABAE',
    // Add other image URLs here
];

const Banner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <Card className="p-1">
              <div className="flex items-center justify-center h-[440px] w-full bg-gray-100">
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};

export default Banner;