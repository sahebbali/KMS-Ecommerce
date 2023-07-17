import React from "react";
import Link from "next/link";
import Image from "next/image";
import Slide from 'react-reveal/Slide';
import { motion } from "framer-motion";
export default function AllProducts({ product }) {
  const { title, _id, image, price, color, size } = product || {};
  return (
    <div className="mt-4 ">
      <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.5 }}>
    
      <Slide bottom>
      <Link href={`/product-details/${_id}`}>
        <Image className="border rounded-xl" src={image} width={500} height={500} alt={title} />
        
        <small className="text-gray-700 text-bold">{title}</small>
        <br />
        <small className="font-bold">${price}</small>
        {/*  <div className="flex items-center justify-center">
          {color.map((c) => (
            <input
              type="radio"
              id="radio-button"
              style={{ backgroundColor: `${c}` }}
              className="w-4 h-4 border-2 border-gray-300 rounded-full appearance-none checked:bg-blue-500 checked:border-blue-500 focus:outline-none ring-2 ring-transparent"
            />
          ))}
        </div> */}
      </Link>
      </Slide>
      </motion.div>
    </div>
  );
}
