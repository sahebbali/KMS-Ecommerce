'use client';
import { useState, useEffect } from 'react';
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Checkbox } from 'antd';
import AllProducts from '../AllProducts/AllProducts';

// accordian icon
function Icon({ id, open }) {
	return open === id ? (
		<FaMinus className='w-5 h-5 transition-transform' />
	) : (
		<FaPlus className='w-5 h-5 transition-transform' />
	);
}
// fetch products
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
const SellerTabProducts = () => {
	const [open, setOpen] = useState(1);
	const [men, setMen] = useState(null);
	const [women, setWomen] = useState(null);
	const [leather, setLeather] = useState(null);
	const [jewelry, setJewelry] = useState(null);
	const [data, setData] = useState(null);
	console.log(men);
	//   accordian handle function
	const handleOpen = (value) => {
		setOpen((prevState) => (prevState === value ? 0 : value));
	};
	//   checked box data for men
	const onChangeMen = (e) => {
		console.log(`checked = ${e.target.checked}`);
		setMen(e.target.checked);
	};
	//   checked box data for men
	const onChangeWomen = (e) => {
		console.log(`checked = ${e.target.checked}`);
		setWomen(e.target.checked);
	};
	//   checked box data for men
	const onChangeLeather = (e) => {
		console.log(`checked = ${e.target.checked}`);
		setLeather(e.target.checked);
	};
	//   checked box data for men
	const onChangeJewelry = (e) => {
		console.log(`checked = ${e.target.checked}`);
		setJewelry(e.target.checked);
	};

	//   get products
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getData();
				setData(result);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);
	console.log(data);
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-12'>
			{/* accordion column */}
			<div className='col-span-4 p-4'>
				<div className='space-y-4'>
					<Accordion
						open={open === 1}
						icon={<Icon id={1} open={open} />}
						className='text-lg'
					>
						<AccordionHeader
							onClick={() => handleOpen(1)}
							className='p-3 bg-gray-200 rounded-lg'
						>
							Filter by Category
						</AccordionHeader>
						<AccordionBody className='flex flex-col p-4 space-y-2 '>
							<Checkbox
								className='px-4 py-2 mt-2 border border-gray-200 rounded-lg'
								onChange={onChangeMen}
							>
								Men
							</Checkbox>
							<Checkbox
								className='px-4 py-2 border border-gray-200 rounded-lg'
								onChange={onChangeWomen}
							>
								Women
							</Checkbox>

							<Checkbox
								className='px-4 py-2 border border-gray-200 rounded-lg'
								onChange={onChangeLeather}
							>
								Leather Goods
							</Checkbox>
							<Checkbox
								className='px-4 py-2 mt-2 border border-gray-200 rounded-lg'
								onChange={onChangeJewelry}
							>
								Jewelry
							</Checkbox>
						</AccordionBody>
					</Accordion>
				</div>
			</div>
			{/* product column */}
			<div className='col-span-8 p-4'>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
					{data?.products.map((product) => (
						<div key={product.id} className='p-4'>
							<AllProducts product={product} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SellerTabProducts;
