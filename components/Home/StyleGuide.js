import React from "react";
import Link from "next/link";
import { BiChevronsRight } from "react-icons/bi";
import Image from "next/image";
export default function StyleGuide() {
  return (
    <div className="grid grid-cols-1 gap-4 mt-32 md:grid-cols-2">
      <Link href="/styleguide1" className="hover:cursor-pointer">
        <div className="flex flex-col items-center justify-center ">
          <Image
            width={500}
            height={500}
            src="https://d19qnzrkx7fd3b.cloudfront.net/media/images/Style-Guide-153.original.format-jpeg.jpg"
            alt="Image"
            className="w-full"
          />
          <div className="flex items-center mt-2">
            Style Guide
            <BiChevronsRight size={20} />
          </div>
        </div>
      </Link>
      <Link href="/styleguide2" className="hover:cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <Image
            width={500}
            height={500}
            src="https://d19qnzrkx7fd3b.cloudfront.net/media/images/Style-Guide-152.original.format-jpeg.jpg"
            alt="Image"
            className="w-full"
          />
          <div className="flex items-center mt-2">
            Style Guide
            <BiChevronsRight size={20} />
          </div>
        </div>
      </Link>
    </div>
  );
}
