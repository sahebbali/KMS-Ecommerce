"use client";
import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import countryList from "react-select-country-list";
import Select from "react-select";
export default function BillingAddress() {
  const [showAddressDiv, setShowAddressDiv] = useState(false);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  // country field value
  const changeHandler = (value) => {
    setValue(value);
  };
  const handleCheckboxChange = (event) => {
    setShowAddressDiv(event.target.checked);
  };
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit function
  const onSubmit = async (data) => {
    console.log(data);
  };

  // Function to get form data without submitting
  const getFormData = () => {
    const data = {
      ...watch(), // Get all form field values
      country: value.label, // Include the selected country
    };
    console.log(data);
  };
  const registerField = (name) => {
    return register(name, {
      onChange: getFormData,
    });
  };

  return (
    <div className="py-6 bg-white rounded-lg shadow-lg sm:py-8 lg:py-12">
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
      <h1 className="pb-8 text-3xl text-center">Billing Details</h1>

      <div className="px-4 mx-auto max-w-screen-2xl md:px-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="line1"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Address line 1*
            </label>
            <input
              type="text"
              {...registerField("line1", {
                required: true,
              })}
              name="line1"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="line2"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Address line 2*
            </label>
            <input
              type="text"
              {...registerField("line2")}
              name="line2"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Phone number*
            </label>
            <input
              type="text"
              {...registerField("phone", {
                required: true,
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              name="phone"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Country/Region*
            </label>
            <Select
              name="country"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
              {...registerField("country")}
              options={options}
              value={value}
              onChange={changeHandler}
            />
          </div>

          <div className="w-full sm:col-span-2">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
                >
                  City *
                </label>
                <input
                  type="text"
                  {...registerField("city")}
                  name="city"
                  className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
                >
                  State *
                </label>
                <input
                  type="text"
                  {...registerField("state")}
                  name="state"
                  className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="postal"
                  className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
                >
                  Postal/ZIP Code*
                </label>
                <input
                  type="text"
                  {...registerField("postal")}
                  name="postal"
                  className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                />
              </div>
            </div>
            {/* checkbox */}
            <div className="inline-flex items-center mt-3 space-x-2">
              <label className={`${showAddressDiv ? "text-blue-500" : ""}`}>
                <input
                  type="checkbox"
                  checked={showAddressDiv}
                  onChange={handleCheckboxChange}
                  className="text-blue-500 form-checkbox"
                />
              </label>
              <span>Ship to a Different Address?</span>
            </div>
            {showAddressDiv && (
              <div className="mt-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="dline1"
                    className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
                  >
                    Address line 1*
                  </label>
                  <input
                    type="text"
                    {...registerField("dline1", {
                      required: true,
                    })}
                    name="dline1"
                    className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                  />
                </div>

                <div className="mt-3 sm:col-span-2">
                  <label
                    htmlFor="dline2"
                    className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
                  >
                    Address line 2*
                  </label>
                  <input
                    type="text"
                    {...registerField("dline2")}
                    name="dline2"
                    className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <label
                      htmlFor="dcity"
                      className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      {...registerField("dcity")}
                      name="dcity"
                      className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dstate"
                      className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      {...registerField("dstate")}
                      name="dstate"
                      className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dpostal"
                      className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
                    >
                      Postal/ZIP Code*
                    </label>
                    <input
                      type="text"
                      {...registerField("dpostal")}
                      name="dpostal"
                      className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={getFormData}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Get Form Data
            </button>
            <button
              type="submit"
              className="px-4 py-2 ml-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
