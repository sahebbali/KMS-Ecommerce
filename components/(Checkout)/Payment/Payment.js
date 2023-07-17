"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import { useParams } from "react-router-dom";
// import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe("paste your public key");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  //   const { id } = useParams();

  //   useEffect(() => {
  //     const makeRequest = async () => {
  //       try {
  //         const res = await newRequest.post(
  //           `/orders/create-payment-intent/${id}`
  //         );
  //         setClientSecret(res.data.clientSecret);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     makeRequest();
  //   }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {/* {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )} */}
      <h1>payment</h1>
    </div>
  );
};

export default Pay;
