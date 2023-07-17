"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Page() {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.tokenUser;
  // Get token value from the URL query parameter
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     router.push("/");
  //   }
  // }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/password/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ppassword: data.ppassword, // Use the correct property name here
            password: data.password,
            cpassword: data.cpassword,
          }),
          // body: JSON.stringify(data),
        }
      );
      console.log(response);

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);

        reset();
        router.push("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the request");
    }
  };

  return (
    <div className="py-6 bg-white sm:py-8 lg:py-12">
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        <form
          className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="ppassword"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Current Password*
            </label>
            <input
              type="ppassword"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none outline-blue-700 bg-gray-50 ring-indigo-300 focus:ring"
              placeholder=" Current Password"
              {...register("ppassword")}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              New password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none outline-blue-700 bg-gray-50 ring-indigo-300 focus:ring"
              type="password"
              placeholder="New Password"
              {...register("password", {
                required: "New Password is required",
                minLength: {
                  value: 8,
                  message: "New Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="mt-3 text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="cpassword"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Confirm password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none outline-blue-700 bg-gray-50 ring-indigo-300 focus:ring"
              type="password"
              placeholder="Confirm New Password"
              {...register("cpassword", {
                required: "Confirm New Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.cpassword && (
              <p className="mt-3 text-red-600">{errors.cpassword.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between sm:col-span-2">
            <button
              type="submit"
              className="inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded-lg outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Save Change
            </button>
          </div>
        </form>
        <ToastContainer
          position="bottom-center"
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
      </div>
    </div>
  );
}
