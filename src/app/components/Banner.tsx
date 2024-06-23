import Image from "next/image";
import React from "react";
import banner from "@/app/images/banner4.webp";
interface BannerProps {
  title: string;
}
export default function Banner({ title }: BannerProps) {
  return (
    <div className="relative block h-[20rem] w-full">
      <Image src={banner} alt="cover" fill style={{ objectFit: "cover" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-tiffany_blue/20 to-transparent h-full z-0 " />
      <div className="hidden lg:block z-10 absolute bottom-0 left-0"></div>
      <div className="hidden lg:block absolute top-1/2 right-0"></div>
      <div className="relative top-1/2 flex  w-full">
        <p className="mx-auto text-black font-poppins text-2xl text-center">
          {title}
        </p>
      </div>
    </div>
  );
}
