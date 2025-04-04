import Link from "next/link";
import React from "react";

const HeroCard = ({ content }: { content: any }) => {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur flex flex-col items-center py-10 px-10 gap-5 min-w-[350px] border rounded-3xl min-h-[400px] justify-between ">
      <div className="flex flex-col justify-end items-start w-full">
        <h2 className="text-[1.5rem]">{content.title}</h2>
        <p className="text-sm text-slate-200">{content.slogan}</p>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex-1 text-center border-r">
          <p className="text-[2rem]">{content.startTime}</p>
          <p className="text-[.5rem]">START TIME</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-[2rem]">{content.duration}</p>
          <p className="text-[.5rem]">DURATION</p>
        </div>
      </div>
      <p className="uppercase">PLAYS {content.date}</p>

      <Link
        href={"/"}
        className="bg-red-500 text-white py-3 px-5 rounded-2xl text-sm w-full text-center mt-5 hover:opacity-80 transition"
      >
        Go to the event
      </Link>
    </div>
  );
};

export default HeroCard;
