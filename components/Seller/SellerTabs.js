"use client";
import { useState } from "react";
import SellerTabProducts from "./SellerTabProducts";
import SellerTabCollections from "./SellerTabCollections";
const SellerTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  //get tabs data function
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex">
        <button
          className={`py-2 ${
            activeTab === "all"
              ? "border-b-2 border-blue-500 bg-blue-500 text-white px-2"
              : ""
          }`}
          onClick={() => handleTabClick("all")}
        >
          All Products
        </button>
        <button
          className={`px-2 py-2 ml-4 ${
            activeTab === "collection"
              ? "border-b-2 border-blue-500 bg-blue-500 text-white "
              : ""
          }`}
          onClick={() => handleTabClick("collection")}
        >
          Collection
        </button>
      </div>
      <div className="my-2 border-b"></div>
      {/* show data according to the tab */}
      <div>
        {activeTab === "all" && <SellerTabProducts />}
        {activeTab === "collection" && <SellerTabCollections />}
      </div>
      
    </>
  );
};
export default SellerTabs;
