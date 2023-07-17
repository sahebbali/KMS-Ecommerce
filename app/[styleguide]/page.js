"use client";
import StyleGuide from "@/components/StyleGuide/StyleGuide";
import React, { useEffect, useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import Loading from "../loading";
async function getData(params) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const page = async ({ params }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(params?.styleguide, currentPage);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  // next button
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // previous button
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // page number
  const paginationButtons = Array.from(Array(data?.totalPages || 0).keys()).map(
    (index) => (
      <li key={index}>
        <button
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3 py-2 leading-tight   ${
            currentPage === index + 1
              ? "text-blue-600 border-blue-300 bg-blue-50"
              : ""
          }`}
        >
          {index + 1}
        </button>
      </li>
    )
  );
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container px-10 mx-auto mt-32">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
        {data?.product.map((product) => (
          <StyleGuide key={product._id} product={product} />
        ))}
      </div>
      {/* pagination start */}
      <div
        aria-label="Page navigation example mt-5"
        className="flex justify-center mt-5 lg:justify-end"
      >
        <ul className="inline-flex items-end -space-x-px">
          <li>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="block px-3 py-2 ml-0 leading-tight rounded-l-lg "
            >
              <span className="sr-only">Previous</span>
              <GrPrevious />
            </button>
          </li>
          {paginationButtons}
          <li>
            <button
              onClick={handleNextPage}
              disabled={currentPage === data?.totalPages}
              className="block px-3 py-2 leading-tightrounded-r-lg "
            >
              <span className="sr-only">Next</span>
              <GrNext />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default page;
