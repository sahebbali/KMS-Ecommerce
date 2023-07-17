import Image from "next/image";
import Banner from "@/public/Banner/seller-banner.jpg";
import { BiCoffeeTogo } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
export default function SellerBanner() {
  return (
    <section className="my-24 space-y-8 ">
      {/* banner Image */}
      <div className="px-8 ">
        <Image alt="seller banner" src={Banner} width={1920} height={800} />
      </div>
      {/* seller profile */}
      <article className="flex justify-between">
        <div className="flex space-x-4">
          <div className="p-4 ">
            <BiCoffeeTogo size={80} />
          </div>
          <div>
            <h2 className="font-semibold font-xl">Clothes & Coffee</h2>
            <p className="text-gray-500 ">Selling Clothes & we love coffee</p>
            <div className="flex items-center text-gray-500 ">
              <IoLocationSharp />
              <p className="pl-2">Boston,Jakarta, Indonesia</p>
            </div>
            <div className="flex items-center text-gray-500">
              <BsLink45Deg />
              <p className="pl-2">
                John since, 25 july | Total Products:15 | Total sales:6
              </p>
            </div>
          </div>
        </div>
        {/* shop owner info */}
        <div className="flex flex-col items-center justify-center space-y-2 text-center text-gray-500 ">
          <p className="text-gray-500">SHOP OWNER</p>
          {/* image */}
          <div className="mx-auto">
            <Image
              src="http://source.unsplash.com/bqe0J0b26RQ/640x800"
              width={50}
              height={50}
              className="rounded-3xl"
            />
          </div>
          <p className="">Pooja</p>
          <button className="flex items-center justify-center px-2 space-x-2 text-white bg-blue-600 rounded-md">
            <AiOutlineMail /> <p>Contact</p>
          </button>
        </div>
      </article>
    </section>
  );
}
