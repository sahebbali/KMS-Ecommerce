"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BannerImage from "@/public/Banner/Kws.png";
const Banner = () => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 5555) {
          return prevCount + 1;
        }
        clearInterval(interval); // Stop the interval when count reaches 5555
        return prevCount;
      });
    }, 1000); // Update the count every 1 millisecond (adjust this value as needed)

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);

  return (
    <section className="mt-24 " style={{ minHeight: `calc(100vh - 13vh)` }}>
      <div className="flex justify-between pl-28">
        <div className="space-y-6 ">
          <h2 className="text-6xl font-bold pt-28">KWS NFT MINT</h2>
          <h2 className="text-6xl ">🎯 </h2>
          {/* counter */}
          <h3 className="text-4xl font-bold"> {count} / 5555 MINTED</h3>
          <div className="flex space-x-4 ">
            <button className="w-2/4 py-4 text-sm font-bold border border-black hover:opacity-60">
              MINT NOW
            </button>
            <button className="w-2/4 py-4 text-sm font-bold border border-black hover:opacity-60">
              WISHLIST NOW
            </button>
          </div>
          <div>
            <h4 className="text-lg font-bold">
              MAX 2 NFTS PER WALLET . PRICE 0.09 ETH + GAS MINT IS
              <br />
              LIVE UNTIL 25 APR 04:00H
              <br />
              PRESALE : SOLDOUT
            </h4>
          </div>
        </div>
        <div className="relative">
          <div className="">
            <Image alt="banner" src={BannerImage} width={800} height={800} />
          </div>
          <div className="absolute left-0 top-8">
            <lottie-player
              id="firstLottie"
              ref={ref}
              autoplay
              loop
              mode="normal"
              src="https://assets10.lottiefiles.com/packages/lf20_lBtFh1H88S.json"
              style={{ width: "100px", height: "100px" }}
            ></lottie-player>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
