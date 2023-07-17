
import Image from "next/image";
import Link from "next/link";
import { FiChevronsRight } from "react-icons/fi";
import { motion } from "framer-motion";
import products from "@/utils/sellerCategory";

const SellerTabCollections = () => {
  console.log(products);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {products.map((product) => (
        <Link
          href={`/collections/${product.category}`}
          key={product._id}
          className="pb-10"
          onClick={() => handleLinkClick(`/collections/${product.category}`)}
        >
          <div className="space-y-4 pr-[1.5px]">
            <div className="">
              <Image
                src={product.image}
                alt="product-image"
                className="w-full"
                width={240}
                height={327}
              />
            </div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <div className="flex items-center justify-center w-2/3 py-2 mx-auto space-x-4 text-center capitalize border shadow-md rounded-xl border-slate-300">
                <button className="text-lg capitalize">
                  {product.category}
                </button>
                <FiChevronsRight size={26} />
              </div>
            </motion.div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SellerTabCollections;
