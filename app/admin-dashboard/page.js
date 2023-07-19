"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

async function getData(page) {
    
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_HOST}/api/seller`,
		{
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

const MyPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);
    useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getData(currentPage);
				console.log('API response:', result); // Check the structure of the response object
                if (result && Array.isArray(result)) {
                    setData(result);
                }
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [currentPage]);

    console.log(data);

    // const changeStatus= async(id)=>{
    //     try {
    //         const response = await fetch(`/api/products/${id}`, {
    //           method: 'PUT',
    //         });
      
    //         if (response.ok) {
    //           // If the status change is successful, update the data locally
    //           const updatedData = data.map((item) => {
    //             if (item._id === id) {
    //               return { ...item, status: 'fulfilled' };
    //             }
    //             return item;
    //           });
    //           console.log("Sucess update: ",response)
    //         } else {
    //           throw new Error('Failed to update status');
    //         }
    //       } catch (error) {
    //         console.error(error);
    //       }
    // }
  return (
    <>

<button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="cta-button-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
         <li>
            <span href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               {/* <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg> */}
               <span class="ml-3"> Admin Dashboard</span>
            </span>
         </li>
        
        
        
      </ul>
     
   </div>
</aside>

<div className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

      <div className="grid  gap-4">
        
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Artist Image
                </th>
                <th scope="col" className="px-6 py-3">
                Artist Name
                </th>
                <th scope="col" className="px-6 py-3">
                Artist Address
                </th>
                <th scope="col" className="px-6 py-3">
                    Eamil
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    NID/Passport
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
              
            </tr>
        </thead>
       
        <tbody>
                {/* {data.map((item)=>(
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
                 */}
           
        </tbody>
    </table>
</div>


      </div>
   </div>
</div>

    </>
  );
};

export default MyPage;
