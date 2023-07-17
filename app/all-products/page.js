'use client';
import { useState, useEffect } from 'react';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import AllProducts from '@/components/AllProducts/AllProducts';
import Loading from '../loading';

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

const Page = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getData(currentPage);
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

	// page number function
	const paginationButtons = Array.from(
		Array(data?.totalPages || 0).keys()
	).map((index) => (
		<li key={index}>
			<button
				onClick={() => setCurrentPage(index + 1)}
				className={`px-3 py-2 leading-tight   ${
					currentPage === index + 1
						? 'text-blue-600 border-blue-300 bg-blue-50'
						: ''
				}`}
			>
				{index + 1}
			</button>
		</li>
	));
	// loading
	if (loading) {
		return <Loading />;
	}
	return (
		<div className='container px-10 mx-auto mt-32'>
			<div className='grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4'>
				{data?.products.map((product) => (
					<AllProducts key={product._id} product={product} />
				))}
			</div>

			{/* pagination start */}
			<div aria-label='Page navigation example' className='mt-5'>
				<div className='flex justify-center'>
					<ul className='flex flex-wrap items-center -space-x-px'>
						<li>
							<button
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
								className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								<span className='sr-only'>Previous</span>
								<IoMdArrowBack />
							</button>
						</li>
						{paginationButtons}
						<li>
							<button
								onClick={handleNextPage}
								disabled={currentPage === data?.totalPages}
								className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								<span className='sr-only'>Next</span>
								<IoMdArrowForward />
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Page;
