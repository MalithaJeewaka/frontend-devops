import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import HeroCard from "./HeroCard";

const contents = [
  {
    title: "Event 1",
    slogan: "Test slogan 1",
    startTime: "7:30",
    duration: "2:15",
    date: "Nov 1st - 15th",
    image: "1.jpg",
  },
  {
    title: "Event 2",
    slogan: "Test slogan 2",
    startTime: "7:30",
    duration: "2:15",
    date: "Nov 1st - 15th",
    image: "2.jpg",
  },
  {
    title: "Event 3",
    slogan: "Test slogan 3",
    startTime: "7:30",
    duration: "2:15",
    date: "Nov 1st - 15th",
    image: "3.jpg",
  },
  {
    title: "Event 4",
    slogan: "Test slogan 4",
    startTime: "7:30",
    duration: "2:15",
    date: "Nov 1st - 15th",
    image: "4.jpg",
  },
];

const Hero = () => {
  return (
    <div>
      <Carousel className="bg-black flex items-center justify-center text-white h-screen ">
        <CarouselContent className="h-screen w-screen">
          {contents.map((content) => (
            <CarouselItem className="w-full flex items-center justify-center relative h-full">
              <Image
                src={`/images/${content.image}`}
                fill
                className="object-cover absolute brightness-50 -z-10"
                alt="my image"
              />
              <div className="flex items-center justify-evenly w-full">
                <h1 className="text-9xl">{content.title}</h1>
                <HeroCard content={content} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="right-10 w-14 h-14 " />
        <CarouselPrevious className="left-10 w-14 h-14 " />
      </Carousel>
    </div>
  );
};

export default Hero;
