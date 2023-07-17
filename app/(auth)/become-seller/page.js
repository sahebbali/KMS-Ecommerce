'use client';
import Select from 'react-select';
import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import countryList from 'react-select-country-list';
import Loading from '@/app/loading';
import { message } from 'antd';
export default function BecomeSellerPage() {
	const {
		register,
		watch,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const router = useRouter();
	const { data: session } = useSession();
	const [value, setValue] = useState('');
	const options = useMemo(() => countryList().getData(), []);
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	const [error, setError] = useState(false);

	// country field value
	const changeHandler = (value) => {
		setValue(value);
	};
	//when user logged in can't visit this page
	useEffect(() => {
		if (session?.user?.tokenUser) {
			console.log('signout');
			signOut();
		}
	}, []);
	// submit function
	const onSubmit = async (data) => {
		let seller = {
			firstName: data.firstName,
			lastName: data.lastName,
			country: value.label,
			password: data.password,
			email: data.email,
			phone: data.phone,
			state: data.state,
			storeName: data.storeName,
			zipcode: data.zipcode,
			role: 'seller',
		};
		console.log(seller);

		let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(seller),
		});
		let response = await res.json();
		console.log(response);
		if (response.success) {
			reset();
			toast.success('seller account has been created', {
				position: 'bottom-left',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			router.push('/login');
		}
		if (response.error) {
			message.error(
				'The email address you provided is already associated with an existing account.For seller registration, a unique email address is required.'
			);
			reset();
		}
	};

	return (
		<div className='py-6 mt-32 bg-white sm:py-8 lg:py-12'>
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
			<h1 className='pb-8 text-5xl text-center'>Create Seller Account</h1>

			<div className='px-4 mx-auto max-w-screen-2xl md:px-8'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2'
				>
					<div className='grid grid-cols-3 gap-4 sm:col-span-2'>
						<div>
							<label
								htmlFor='firstName'
								className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
							>
								First name*
							</label>
							<input
								type='text'
								{...register('firstName', {
									required: true,
									minLength: 2,
								})}
								name='firstName'
								className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
							/>
							{errors.firstName &&
								errors.firstName.type === 'required' && (
									<span className='mt-3 text-red-600'>
										This is required
									</span>
								)}
							{errors.firstName &&
								errors.firstName.type === 'minLength' && (
									<span className='mt-3 text-red-600'>
										Min length required
									</span>
								)}
						</div>

						<div>
							<label
								htmlFor='lastName'
								className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
							>
								Last name
							</label>
							<input
								type='text'
								{...register('lastName')}
								name='lastName'
								className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
							/>
						</div>

						<div>
							<label
								htmlFor='storeName'
								className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
							>
								Store name
							</label>
							<input
								type='text'
								{...register('storeName')}
								name='storeName'
								className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
							/>
						</div>
					</div>
					<div className='sm:col-span-2'>
						<label
							htmlFor='email'
							className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
						>
							Email*
						</label>
						<input
							type='email'
							{...register('email', {
								required: true,
								pattern: {
									value: /\S+@\S+\.\S+/,
									message:
										'Entered value does not match email format',
								},
							})}
							name='email'
							className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
						/>
						{errors.email && (
							<span role='alert'>{errors.email.message}</span>
						)}
					</div>

					<div className='sm:col-span-2'>
						<label
							htmlFor='phone'
							className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
						>
							Phone number
						</label>
						<input
							{...register('phone')}
							type='text'
							name='phone'
							className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
						/>
					</div>
					<div className='sm:col-span-2'>
						<label
							htmlFor='country'
							className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
						>
							Country/Region*
						</label>
						<Select
							name='country'
							className='w-full px-3 py-2 text-gray-800 transition duration-100 rounded outline-none ring-indigo-300 focus:ring'
							// {...register("country")}
							options={options}
							value={value}
							onChange={changeHandler}
						/>
					</div>
					{/*city,state, zipcode */}
					<div className='grid grid-cols-3 gap-4 sm:col-span-2'>
						<div>
							<label
								htmlFor='city'
								className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
							>
								City
							</label>
							<input
								type='text'
								name='city'
								className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
							/>
						</div>

						<div>
							<label
								htmlFor='state'
								className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
							>
								State
							</label>
							<input
								type='text'
								{...register('state')}
								name='state'
								className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
							/>
						</div>

						<div>
							<label
								htmlFor='zipcode'
								className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
							>
								Zipcode
							</label>
							<input
								type='text'
								{...register('zipcode')}
								name='zipcode'
								className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
							/>
						</div>
					</div>
					<div className='sm:col-span-2'>
						<label
							htmlFor='password'
							className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
						>
							Password*
						</label>
						<input
							type='text'
							{...register('password', {
								required: true,
								minLength: {
									value: 5,
									message: 'min length is 5',
								},
							})}
							name='password'
							className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
						/>
						{errors.password && (
							<span className='mt-2 text-red-600' role='alert'>
								{errors.password.message}
							</span>
						)}
					</div>
					<div className='sm:col-span-2'>
						<label
							htmlFor='cpassword'
							className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
						>
							Confirm Password*
						</label>
						<input
							type='text'
							{...register('cpassword', {
								required: true,
								validate: (val) => {
									if (watch('password') != val) {
										return 'Your passwords do no match';
									}
								},
							})}
							name='cpassword'
							className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
						/>
						{errors.cpassword && (
							<p role='alert' className='mt-2 text-red-600'>
								{errors.cpassword?.message}
							</p>
						)}
					</div>
					<label className='flex items-left'>
						<input
							type='checkbox'
							checked={checkboxChecked}
							onChange={(e) =>
								setCheckboxChecked(e.target.checked)
							}
							className='mr-2'
						/>
						<span className='text-sm text-gray-800'>
							Agree to create account as a seller
						</span>
					</label>

					<div className='flex items-center justify-between sm:col-span-2'>
						<button
							type='submit'
							className={`inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none ring-indigo-300 focus-visible:ring md:text-base ${
								!checkboxChecked
									? 'bg-gray-500 cursor-not-allowed'
									: 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700'
							}`}
							disabled={!checkboxChecked}
						>
							{' '}
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}