"use client";

import React, {useEffect, useRef} from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select, Checkbox, Input } from "antd";
import { useSession } from "next-auth/react";
const { Option } = Select;
export default function page() {
  // session
      let nameRef,addressRef, emailRef,mobileRef,dateRef,nidRef,ImgRef=useRef();

  const { data: session } = useSession();
  const email = session?.user?.tokenUser;
 

 const  getBase64=(file)=>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
const PreviewImage = () => {
  let ImgFile = ImgRef.files[0];
  getBase64(ImgFile).then((base64Img)=>{
      ImgRef.src=base64Img;
  })
}


  // submit function
 
  const onSubmit = async () => {
         let name=nameRef.value;
        let address=addressRef.value;
       let email=emailRef.value;
        let mobile=mobileRef.value;
        let date=dateRef.value;
        let nidNumber= nidRef.value;
        let photo=ImgRef.src
      const salerbody ={
        sellerName:name,
        sellerAddress:address,
        sellerEmail:email,
        sellerCreationDate:date,
        sellerPhoneNumber:mobile,
        sellerNidNumber:nidNumber,
        sellerimage:photo,
      }
      if(!email){
          toast.error("Valid Email Address Required !")
      }
      else if(!name){
        toast.error("Nameis Required !")
      }
      else if(!address){
        toast.error("Address id Required !")
      }
      else if(!mobile){
        toast.error("Phone Number is Required !")
      }
      else if(!nidNumber){
        toast.error("NID is Required !")
      }
      else if(!photo){
        toast.error("Image is Required !")
      }
      else if(!date){
        toast.error("Date is Required !")
      }
      else{
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/seller`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(salerbody),
          });
          let response = await res.json();
          console.log(response);
          reset();
          toast.success("Your product has been created", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          
      }
    console.log(name,address,email,mobile,date,nidNumber,photo);
debugger;
    // 
  };
  
  return (
    <div className="py-6 bg-white sm:py-8 lg:py-12">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="pb-8 text-5xl mt-8 text-center">Seller </h1>
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        <form
         
          className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2"
        >
          <div className="col-4 p-2">
                 <label>Profile Picture</label>
               <input onChange={PreviewImage}  ref={(input)=>ImgRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
         </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Seller  Name
            </label>
            <input
               ref={(input)=>nameRef=input}
              type="text"
              name="name"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Seller  Address
            </label>
            <input
               ref={(input)=>addressRef=input}
              type="text"
              name="address"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Seller  Email
            </label>
            <input
              ref={(input)=>emailRef=input}
              type="email"
              name="email"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 sm:col-span-2">
            <div>
              <label
                htmlFor="sellerSKU"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Date
              </label>
              <input
               ref={(input)=>dateRef=input}
                type="date"
                name="date"
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
              />
            </div>
          
            <div>
              <label
                htmlFor="sellerSKU"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                NID/Passport 
              </label>
              <input
               ref={(input)=>nidRef=input}
                type="number"
                name="nid"
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="sellerSKU"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Phone 
              </label>
              <input
                ref={(input)=>mobileRef=input}
                type="number"
                name="phone"
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
              />
            </div>
          
           
           
          </div>

        
        

          <div className="flex items-center justify-between sm:col-span-2">
            <button
            onClick={onSubmit}
              type="submit"
              className="inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded-lg outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Mint 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
