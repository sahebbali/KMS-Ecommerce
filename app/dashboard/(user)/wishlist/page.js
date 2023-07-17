"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "./../../../loading";
import { useSession } from "next-auth/react";
export default function page() {
  const { data: session } = useSession();
  const email = session?.user?.tokenUser;
  console.log(email);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/wishlist/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data.wishlistItem);
      });
  }, [email, wishlist]);

  console.log(wishlist);
  return (
    <div className="container px-10 mx-auto mt-32">
      {wishlist?.length === 0 ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist?.map((w) => (
            <div className="mt-4" key={w.id}>
              <Image src={w.image} width={500} height={500} alt={w.title} />
              <small className="text-gray-700 text-bold">{w.title}</small>
              <br />
              <small className="font-bold">${w.price}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
