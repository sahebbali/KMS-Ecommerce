"use client";
import React, { useEffect, useState } from "react";
import Pay from "./../Payment/Payment";
import { useSession } from "next-auth/react";

export default function CheckoutOrder() {
  const [cartItems, setCartItems] = useState([]);
  const { data: session } = useSession();
  const email = session?.user?.tokenUser;
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.cartItems);
      });
  }, [email]);
  // calculate amount
  const calculateItemAmount = (price, quantity) => {
    return price * quantity;
  };
  // total
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems?.forEach((item) => {
      const price = parseInt(item.price, 10);
      const quantity = parseInt(item.quantity, 10);
      total += calculateItemAmount(price, quantity);
    });
    return total.toFixed(2);
  };

  return (
    <>
      <div className="rounded-lg shadow-lg">
        <h1 className="pb-8 mt-8 text-3xl text-center">Your Order</h1>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left ">
            <thead className="text-xs uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const { title, price, quantity } = item;
                const itemAmount = calculateItemAmount(
                  parseInt(price, 10),
                  parseInt(quantity, 10)
                );
                return (
                  <tr className="bg-white border-b " key={item.id}>
                    <th scope="row" className="px-6 py-4 font-medium ">
                      {title}
                      <p className="mt-3 text-gray-500">Quantity: {quantity}</p>
                    </th>
                    <td className="px-6 py-4 text-bold">${itemAmount}</td>
                  </tr>
                );
              })}
              <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 dark:text-white">
                  Total
                </th>
                <td className="px-6 py-4 ">${calculateTotalAmount()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Pay />
    </>
  );
}
