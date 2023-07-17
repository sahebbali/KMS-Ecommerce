"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
export default function page() {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const { data: session } = useSession();
  const email = session?.user?.tokenUser;
  console.log(email);
  const [userInfo, setUserInfo] = useState({});
const router= useRouter()
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [email]);

  // submit function
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        toast.success('User information updated successfully');
        logout(); // Call the logout function to log out the user
        router.push('/login'); // Redirect to the login page
      } else {
        toast.error('Failed to update user information');
      }
    } catch (error) {
      console.error('An error occurred while updating user information:', error);
      toast.error('Internal Server Error');
    }
  };
  
  return (
    <div className="py-6 mt-32 bg-white sm:py-8 lg:py-12">
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
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="firstName"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              First name*
            </label>
            <input
              type="text"
              {...register("firstName", {
                required: true,
                minLength: 2,
              })}
              defaultValue={userInfo?.firstName}
              name="firstName"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Last name
            </label>
            <input
             defaultValue={userInfo?.lastName}
              type="text"
              {...register("lastName")}
              name="lastName"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="newEmail"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Email*
            </label>
            <input
              type="newEmail"
              defaultValue={userInfo?.email}
              {...register("newEmail", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              name="newEmail"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
            {errors.newEmail && <span role="alert">{errors.newEmail.message}</span>}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Phone number
            </label>
            <input
             defaultValue={userInfo?.phone}
              {...register("phone")}
              type="text"
              name="phone"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>

          <div className="flex items-center justify-between sm:col-span-2">
            <button
              type="submit"
              className="inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded-lg outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
