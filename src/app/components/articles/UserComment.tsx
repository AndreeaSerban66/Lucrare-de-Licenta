// src/app/components/articles/UserComment.tsx

import Image from "next/image";
import React from "react";
import { StaticImageData } from "next/image";

interface UserCommentProps {
  name: string;
  icon: StaticImageData | string;
  date: Date;
  comment: string;
}

const UserComment: React.FC<UserCommentProps> = ({
  name,
  icon,
  date,
  comment,
}) => {
  const commentDate =
    date instanceof Date
      ? date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        "  " +
        date.getHours() +
        ":" +
        date.getMinutes()
      : "Invalid date";

  return (
    <div className="p-4 sm:p-5 border border-transparent border-b-black flex flex-col sm:flex-row items-start sm:items-center">
      <div className="flex-shrink-0 text-center">
        <Image
          src={typeof icon === "string" ? icon : (icon as StaticImageData)}
          alt={name}
          className="rounded-full w-10 h-10 mx-auto"
          width={40}
          height={40}
        />
        <h1 className="font-poppinslight mt-2 text-xs sm:text-base">{name}</h1>
      </div>
      <div className="mt-2 sm:mt-0 sm:ml-6 flex flex-col justify-center w-full">
        <div className="text-xs sm:text-sm font-poppinslight italic text-black">
          {commentDate}
        </div>
        <div>
          <p className="text-sm sm:text-lg">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
