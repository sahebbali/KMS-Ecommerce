'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BiHeart } from 'react-icons/bi';
import AccordionDetails from './Accordion/Accordion ';
import ImagePreview from './ImagePreview/ImagePreview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { message } from 'antd';
export default function Details({ data }) {
	const { _id, title, price, image, color, size, quantity } =
		data.product || {};
	const [quantityProduct, setQuantityProduct] = useState(0);
	const [selectedSizes, setSelectedSizes] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [isInCart, setIsInCart] = useState(false);
	const [isInWishlist, setIsInWishlist] = useState(false);
	const versions = ['NFT', 'OFFPRINT', '3D'];
	const [selectedVersions, setSelectedVersions] = useState([]);
	/* console.log(selectedVersions); */
	//versions
	const handleVersionClick = (version) => {
		// Check if the version is already selected
		if (selectedVersions.includes(version)) {
			// If selected, remove it from the array
			setSelectedVersions(selectedVersions.filter((v) => v !== version));
		} else {
			// If not selected, add it to the array
			setSelectedVersions([...selectedVersions, version]);
		}
	};
	const { data: session } = useSession();
	const email = session?.user?.tokenUser;

	// increase button
	const handleIncrease = () => {
		if (quantityProduct < quantity) {
			setQuantityProduct((plus) => plus + 1);
		}
	};

	// decrease button
	const handleDecrease = () => {
		if (quantityProduct > 0) {
			setQuantityProduct((minus) => minus - 1);
		}
	};
	// Check if the product is already in the cart when the component mounts
	useEffect(() => {
		const checkCartStatus = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_HOST}/api/cart`,
					{
						method: 'POST',
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify({ _id, email }),
					}
				);
				const response = await res.json();
				setIsInCart(response.isInCart);
			} catch (error) {
				console.log('Error occurred while checking cart status', error);
			}
		};

		const checkWishlistStatus = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_HOST}/api/wishlist`,
					{
						method: 'POST',
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify({ _id, email }),
					}
				);
				const response = await res.json();
				setIsInWishlist(response.isInWishlist);
			} catch (error) {
				console.log(
					'Error occurred while checking wishlist status',
					error
				);
			}
		};

		checkCartStatus();
		checkWishlistStatus();
	}, [_id, email]);

	// add to the cart
	const addCart = async () => {
		if (!selectedVersions.includes('NFT')) {
			// Show an error message to the user (optional)
			message.info(
				'Please select the NFT version before adding to cart.'
			);

			return;
		}

		const data = {
			productId: _id,
			title,
			price,
			image,
			size: selectedSizes,
			color: selectedColor,
			quantity: quantityProduct,
			email,
		};
		console.log(data);
		let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(data),
		});
		let response = await res.json();
		if (response.isInCart == false) {
			setIsInCart(true);
		}
		console.log(response);
	};

	// delete from cart
	const removeFromCart = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_HOST}/api/cart/${_id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						email: email,
					},
				}
			);

			if (res.ok) {
				setIsInCart(false);
				toast.success('Product removed successfully', {
					position: 'bottom-left',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else {
				console.log('Failed to remove product from cart');
			}
		} catch (error) {
			console.log(
				'Error occurred while removing product from cart',
				error
			);
		}
	};
	//wishlist
	const wishlist = async () => {
		const data = {
			productId: _id,
			title,
			price,
			image,
			email,
		};
		console.log(data);
		console.log(data);
		let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/wishlist`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(data),
		});
		let response = await res.json();
		if (response.isInWishlist == false) {
			setIsInWishlist(true);
		}
		console.log(response);
	};

	// delete from cart
	const removeFromWishlist = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_HOST}/api/wishlist/${_id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						email: email,
					},
				}
			);

			if (res.ok) {
				setIsInWishlist(false);
				toast.success('Product removed successfully', {
					position: 'bottom-left',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else {
				console.log('Failed to remove product from cart');
			}
		} catch (error) {
			console.log(
				'Error occurred while removing product from cart',
				error
			);
		}
	};

	return (
		<div className='px-4 mx-auto md:px-8'>
			<ToastContainer
				position='bottom-left'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<div className='grid gap-20 md:grid-cols-2'>
				<div className='space-y-4'>
					<div
						className='relative overflow-hidden bg-gray-100 rounded-lg'
						// style={{ height: "700px" }}
					>
						<Image
							width={100}
							height={100}
							src={image || title}
							loading='lazy'
							alt='Photo by fastsell'
							className='object-cover object-center w-full h-full'
						/>
					</div>
					{/* <div className="grid grid-cols-2 gap-4"> */}
					<ImagePreview />
					{/* </div> */}
				</div>

				<div className='md:py-8'>
					<div className='mb-2 md:mb-3'>
						<h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>
							{title}
						</h2>
					</div>
					<div className='mb-4 md:mb-6'>
						<span className='inline-block mb-3 text-sm font-semibold text-gray-500 md:text-base'>
							Color
						</span>

						<div className='flex flex-wrap gap-3'>
							{color?.map((c) => (
								<button
									onClick={() => setSelectedColor(c)}
									className={`w-8 h-8 transition duration-100 border rounded-full ${
										selectedColor === c
											? 'border-gray-500'
											: ''
									}`}
									style={{
										backgroundColor: c,
										outline: `2px solid ${c}`,
									}}
								></button>
							))}
						</div>
					</div>

					<div className='mb-8 md:mb-10'>
						<span className='inline-block mb-3 text-sm font-semibold text-gray-500 md:text-base'>
							Size
						</span>

						<div className='flex flex-wrap gap-3'>
							{size?.map((s) => (
								<button
									onClick={() => setSelectedSizes(s)}
									type='button'
									className={`flex items-center justify-center w-12 h-8 text-sm font-semibold text-center text-gray-800 uppercase transition duration-100 border rounded-md ${
										selectedSizes === s
											? 'text-white bg-indigo-500'
											: 'bg-white hover:bg-gray-100'
									}`}
								>
									{s}
								</button>
							))}
						</div>
					</div>

					{/* version */}
					<div className='mb-8 md:mb-10'>
						<span className='inline-block mb-3 text-sm font-semibold text-gray-500 md:text-base'>
							Version
						</span>

						<div className='flex flex-wrap gap-3'>
							<div className='flex flex-wrap gap-3'>
								{versions?.map((s) => (
									<button
										onClick={() => handleVersionClick(s)}
										key={s}
										type='button'
										className={`flex items-center justify-center w-20 h-8 text-sm font-semibold text-center text-gray-800 uppercase transition duration-100 border rounded-md ${
											selectedVersions.includes(s)
												? 'text-white bg-indigo-500'
												: 'bg-white hover:bg-gray-100'
										}`}
									>
										{s}
									</button>
								))}
							</div>
						</div>
					</div>
					<div className='mb-4'>
						<div className='flex items-end gap-2'>
							<span className='text-xl font-bold text-gray-800 md:text-2xl'>
								${price}
							</span>
						</div>
					</div>

					<div className='flex gap-2.5'>
						{/* quantity */}
						<div className='flex items-center justify-center flex-1 px-8 py-3 space-x-4 text-sm font-semibold text-center border-2 border-indigo-300 rounded-full outline-none ring-indigo-300 focus-visible:ring sm:flex-none md:text-base sm:text-center md:justify-center'>
							<button onClick={handleDecrease}>-</button>
							<input
								type='text'
								name='qty'
								disabled
								value={quantityProduct}
								className='w-12 text-center outline-none'
							/>
							<button onClick={handleIncrease}>+</button>
						</div>

						{isInCart ? (
							<button
								onClick={removeFromCart}
								className='items-center flex-1 inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-red-500 rounded-full outline-none ring-red-300 hover:bg-red-600 focus-visible:ring active:bg-red-700 sm:flex-none md:text-base sm:text-center md:justify-center'
							>
								Remove from cart
							</button>
						) : (
							<button
								onClick={addCart}
								className='items-center flex-1 inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded-full outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base sm:text-center md:justify-center'
							>
								Add to cart
							</button>
						)}
						{/* wishlist */}
						{isInWishlist ? (
							<button
								onClick={removeFromWishlist}
								className='inline-flex items-center justify-center p-3 text-sm font-semibold text-center transition duration-100 bg-indigo-500 rounded-full outline-none ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base text-white-500'
							>
								<span className='rounded-full'>
									<BiHeart size={30} />
								</span>
							</button>
						) : (
							<button
								onClick={wishlist}
								className='inline-flex items-center justify-center p-3 text-sm font-semibold text-center text-gray-500 transition duration-100 bg-gray-200 rounded-full outline-none ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base'
							>
								<span className='rounded-full'>
									<BiHeart size={30} />
								</span>
							</button>
						)}
					</div>
					{/* description */}
					<div className='mt-10 md:mt-16 lg:mt-20'>
						<div className='mb-3 text-lg font-semibold text-gray-800'>
							Description
						</div>

						<p className='text-gray-500'>
							This is a section of some simple filler text, also
							known as placeholder text. It shares some
							characteristics of a real written text but is random
							or otherwise generated. It may be used to display a
							sample of fonts or generate text for testing.
							<br />
							<br />
							This is a section of some simple filler text, also
							known as placeholder text. It shares some
							characteristics of a real written text but is random
							or otherwise generated.
						</p>
					</div>
					<div className='mt-10 md:mt-16 lg:mt-20'>
						<AccordionDetails />
					</div>
				</div>
			</div>
		</div>
	);
}
