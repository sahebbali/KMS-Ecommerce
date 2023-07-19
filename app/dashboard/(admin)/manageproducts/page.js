"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

async function getData(page) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_HOST}/api/products?page=${page}`,
		{
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

const page = () => {
 const [currentPage, setCurrentPage] = useState(1)
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);
    useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getData(currentPage);
				console.log('API response:', result); // Check the structure of the response object
                if (result && Array.isArray(result.products)) {
                    setData(result.products);
                }
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [currentPage]);

    console.log(data);

    const changeStatus= async(id)=>{
        try {
            const response = await fetch(`/api/products/${id}`, {
              method: 'PUT',
            });
      
            if (response.ok) {
              // If the status change is successful, update the data locally
              const updatedData = data.map((item) => {
                if (item._id === id) {
                  return { ...item, status: 'fulfilled' };
                }
                return item;
              });
              console.log("Sucess update: ",response)
            } else {
              throw new Error('Failed to update status');
            }
          } catch (error) {
            console.error(error);
          }
    }
  return (
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Stock
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                <th scope="col" className="px-6 py-3">
                Approped
                </th>
            </tr>
        </thead>
        {console.log("hello1")}
        <tbody>
                {data.map((item)=>(
                    < >
                <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                       
                <th scope="row" className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Image src={item.image} height={40} width={40} alt='product Image' />
                  
                </th>
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {item.title}
                </th>
                <td className="px-6 py-4">
                   {item.color}
                </td>
                <td className="px-6 py-4">
                    {item.category}
                </td>
                <td className="px-6 py-4">
                   <spa>$ {" "}</spa> {item.price}
                </td>
                <td className="px-6 py-4">
                    {item.stock}
                </td>
                <td className="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                {
                    item.status == "pending" && <td className="px-6 py-4">
                    <button onClick={() => changeStatus(item._id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            YES
                    </button>
                    </td>
                }
            </tr>
            </>

                ))}
                
           
        </tbody>
    </table>
</div>

  )
}

export default page
