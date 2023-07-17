'use client';
// import { useUser } from "@/components/Context/UserContext";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
export default function page() {
	const router = useRouter();
	// const { updateUser } = useUser();
	const {
		register,
		watch,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// useEffect(() => {
	//   if (localStorage.getItem("token")) {
	//     router.push("/");
	//   }
	// }, []);
	const { data: session } = useSession();
	console.log(session?.user);

	// submit form
	const onSubmit = async (data) => {
		const result = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: true,
			callbackUrl: '/',
		});
		reset();
		console.log(result);

		toast.success('You are successfully signed in', {
			position: 'bottom-left',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
		// let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
		//   method: "POST",
		//   headers: { "content-type": "application/json" },
		//   body: JSON.stringify(data),
		// });
		// let response = await res.json();
		// reset();
		// if (response.success) {
		//   console.log(response);
		//   // localStorage.setItem("token", response.token);
		//   // localStorage.setItem("email", response.tokenUser);
		//   // localStorage.setItem("name", response.name);
		//   toast.success("You are successfully logged in", {
		//     position: "bottom-left",
		//     autoClose: 5000,
		//     hideProgressBar: false,
		//     closeOnClick: true,
		//     pauseOnHover: true,
		//     draggable: true,
		//     progress: undefined,
		//     theme: "light",
		//   });
		//   // updateUser(); // Trigger state update
		//   setTimeout(() => {
		//     router.push("/");
		//   }, 1000);
		// } else {
		//   toast.error(response.error, {
		//     position: "bottom-left",
		//     autoClose: 5000,
		//     hideProgressBar: false,
		//     closeOnClick: true,
		//     pauseOnHover: true,
		//     draggable: true,
		//     progress: undefined,
		//     theme: "light",
		//   });
		// }
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
			<h1 className='pb-8 text-5xl text-center'>Login</h1>
			{/* toggle button start*/}
			<div className='flex items-center justify-center'>
				<div className='p-1 mb-8 border-2 border-blue-500 rounded-lg'>
					<Link href='/signup'>
						<button className='px-4 py-2 ml-2 font-bold text-blue-600 rounded'>
							Sign Up
						</button>
					</Link>
					<button className='px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 '>
						Login
					</button>
				</div>
			</div>

			{/* toggle button end*/}
			<div className='px-4 mx-auto max-w-screen-2xl md:px-8'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2'
				>
					<div className='sm:col-span-2'>
						<label
							htmlFor='email'
							className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
						>
							Email*
						</label>
						<input
							{...register('email')}
							name='email'
							className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
						/>
					</div>

					<div className='sm:col-span-2'>
						<label
							htmlFor='password'
							className='inline-block mb-2 text-sm text-gray-800 sm:text-base'
						>
							Password*
						</label>
						{/* set role */}
						<input
							{...register('password')}
							name='password'
							className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring'
						/>
					</div>

					<div className='flex items-center justify-between sm:col-span-2'>
						<button className='inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded-lg outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base'>
							Login
						</button>

						<Link href='forgot' className='text-sm text-gray-500'>
							Forget password
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}