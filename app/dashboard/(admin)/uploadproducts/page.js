"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select, Checkbox, Input } from "antd";
import { useSession } from "next-auth/react";
const { Option } = Select;
export default function page() {
  // session
  const { data: session } = useSession();
  const email = session?.user?.tokenUser;
  // version state
  const versions = ["nft", "offprint", "3d"];
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [offprintStock, setOffprintStock] = useState("");
  const [nftStock, setNftStock] = useState("");

  // version control
  const handleVersionChange = (selectedValues) => {
    setSelectedVersions(selectedValues);
  };
  // offprint
  const handleOffprintStockChange = (e) => {
    setOffprintStock(e.target.value);
  };
  // nft
  const handleNftStockChange = (e) => {
    setNftStock(e.target.value);
  };
  console.log(selectedVersions);
  console.log(offprintStock);
  // input field
  const renderStockInput = (version) => {
    if (version === "offprint") {
      return (
        <>
          <input
            name="print"
            className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            value={offprintStock}
            onChange={handleOffprintStockChange}
            placeholder="Stock of offprint"
          />
          {/* package */}
          <label
            htmlFor="weight"
            className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
          >
            Package weight
          </label>
          <input
            type="text"
            {...register("weight")}
            name="weight"
            className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
          />

          <div>
            <label
              htmlFor="dimension"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Dimension
            </label>
            <input
              type="text"
              {...register("dimension")}
              name="dimension"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>
        </>
      );
    } else if (version === "nft") {
      return (
        <>
          <input
            className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            name="nft"
            value={nftStock}
            onChange={handleNftStockChange}
            placeholder="Stock of nft"
          />
        </>
      );
    }
    return null;
  };
  // submit function
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const product = {
      ...data,
      offprintStock,
      nftStock,
      email,
    };
    console.log(data);
    console.log(product);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    });
    let response = await res.json();
    console.log(response);
    // reset();
    // toast.success("Your product has been created", {
    //   position: "bottom-left",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
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
      <h1 className="pb-8 text-5xl text-center">Upload Product</h1>
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Product Title
            </label>
            <input
              {...register("title")}
              type="text"
              name="title"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="desc"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Product Description
            </label>
            <input
              {...register("desc")}
              type="text"
              name="desc"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Image link
            </label>
            <input
              {...register("image")}
              type="text"
              name="image"
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
            />
          </div>
          {/* color */}
          <div className="grid grid-cols-3 gap-4 sm:col-span-2">
            <div>
              <label
                htmlFor="sellerSKU"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Seller SKU
              </label>
              <input
                {...register("sellerSKU")}
                type="text"
                name="sellerSKU"
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="color"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Color
              </label>
              <select
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                {...register("color")}
              >
                <option value="red">Red</option>
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* size */}
            <div>
              <label
                htmlFor="size"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Size
              </label>
              <select
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                {...register("size")}
              >
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:col-span-2">
            {/* price */}
            <div>
              <label
                htmlFor="price"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Price
              </label>
              <input
                type="text"
                {...register("price", {
                  required: true,
                  minLength: 2,
                })}
                name="price"
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
              />
            </div>
            {/* quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Quantity
              </label>
              <input
                type="text"
                {...register("quantity")}
                name="quantity"
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Stock Status
              </label>
              <select
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                {...register("stock")}
              >
                <option value="in">Stock In</option>
                <option value="out">Stock Out</option>
              </select>
            </div>
          </div>

          {/* category */}
          <div className="grid grid-cols-3 gap-4 sm:col-span-2">
            <div>
              <label
                htmlFor="category"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Category
              </label>
              <select
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                {...register("category")}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="leatherGoods">Leather Goods</option>
                <option value="jewelry">Jewelry</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="subcategory"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Sub Category
              </label>
              <select
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                {...register("subcategory")}
              >
                <option value="ready-to-wear">Ready to wear</option>
                <option value="t-shirts">T-shirts and Polos</option>
                <option value="shirts">Shirts</option>
                <option value="knitwear">Knitwear</option>
                <option value="jacket">Jacket</option>
                <option value="outerwear">Outerwear</option>
                <option value="swimwear">Swimwear</option>
                <option value="pants">Pants</option>
                <option value="puffer-jackets">Puffer Jackets</option>
                <option value="tops">Tops</option>
                <option value="skirt">Skirt</option>
                <option value="coat">Coat</option>
                <option value="wallets-for-women">Wallets for Women</option>
                <option value="dresses">Dresses</option>
                <option value="all-fashion-jewellery">
                  All Fashion Jewellery
                </option>
                <option value="earrings">Earrings</option>
                <option value="necklaces">Necklaces</option>
                <option value="bracelet">Bracelet</option>
                <option value="rings">Rings</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="available"
                className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
              >
                Available
              </label>
              <select
                className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
                {...register("available")}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          {/* version field */}
          <div className="sm:col-span-2">
            <label
              htmlFor="version"
              className="inline-block mb-2 text-sm text-gray-800 sm:text-base"
            >
              Version
            </label>
            <Select
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
              mode="multiple"
              placeholder="Select versions"
              onChange={handleVersionChange}
              bordered={false}
            >
              {versions.map((version) => (
                <Option key={version} value={version}>
                  {version}
                </Option>
              ))}
            </Select>
            {selectedVersions.map((version) => (
              <div key={version} style={{ marginTop: "10px" }}>
                <Checkbox checked>{version}</Checkbox>
                {renderStockInput(version)}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between sm:col-span-2">
            <button
              type="submit"
              className="inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded-lg outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
