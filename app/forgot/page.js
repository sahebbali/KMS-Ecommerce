"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
export default function Page() {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [token, setToken] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const { data: session } = useSession();
  // Get token value from the URL query parameter
  useEffect(() => {
    const queryString =
      typeof window !== "undefined" ? window.location.search : "";
    const urlParams = new URLSearchParams(queryString);
    const tokenParam = urlParams.get("token");
    setToken(tokenParam);
    if (session?.user?.tokenUser) {
      router.push("/");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/forget`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: data.password,
              cpassword: data.cpassword,
              email: data.cemail,
              sendMail: false,
            }),
          }
        );
        console.log(response);
        console.log(resetEmail);

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message);
          if (!token) {
            setResetEmail(data.email);
          }
          reset();
          router.push("/login");
        } else {
          toast.error(result.message);
        }
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/forget`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              sendMail: true,
            }),
          }
        );

        console.log(response);
        const result = await response.json();
        console.log(response, " ", result);

        if (response.ok) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        setResetEmail(data.email);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the request");
    }
  };

  return (
    <div className="py-6 bg-white sm:py-8 lg:py-12">
      <h1 className="pb-8 text-5xl text-center">Reset</h1>
      <h3 className="text-center text-gray-500">
        Please enter your email address to receive a password reset link.
      </h3>
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        {!token && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Email*
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none outline-blue-700 bg-gray-50 ring-indigo-300 focus:ring"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-3 text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between sm:col-span-2">
              <button
                type="submit"
                className="inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded-lg outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Reset now
              </button>
            </div>
          </form>
        )}

        {token && (
          <form
            className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Confirm Email*
              </label>
              <input
                type="cemail"
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none outline-blue-700 bg-gray-50 ring-indigo-300 focus:ring"
                placeholder="cEmail"
                {...register("cemail", {
                  required: "cEmail is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid confirm email",
                  },
                })}
              />
              {errors.cemail && (
                <p className="mt-3 text-red-600">{errors.cemail.message}</p>
              )}
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
                Reset now
              </button>
            </div>
          </form>
        )}

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
