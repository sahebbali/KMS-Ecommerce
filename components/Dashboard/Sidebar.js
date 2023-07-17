'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiChevronsRight } from 'react-icons/bi';
import { useSession, signOut } from 'next-auth/react';
import Logo from '@/public/logo/kws.png';
import Image from 'next/image';
const Sidebar = () => {
	const { data: session } = useSession();
	const email = session?.user?.tokenUser;
	const [userRole, setUserRole] = useState({});
	console.log(email);
	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/${email}`)
			.then((res) => res.json())
			.then((data) => {
				setUserRole(data.role);
			});
	}, [email, userRole]);

	console.log(userRole);
	const users = [
		{
			name: 'Orders',
			pathname: '/dashboard/orders',
			icon: <BiChevronsRight size={25} />,
		},
		{
			name: 'Wishlist',
			pathname: '/dashboard/wishlist',
			icon: <BiChevronsRight size={25} />,
		},
		{
			name: 'Account info',
			pathname: '/dashboard/account-info',
			icon: <BiChevronsRight size={25} />,
		},
		{
			name: ' Change Password',
			pathname: '/dashboard/change-password',
			icon: <BiChevronsRight size={25} />,
		},
		// {
		//   name: "Logout",
		//   pathname: "/",
		//   icon: <BiChevronsRight size={25} />,
		// },
	];
	return (
		<div className='min-h-screen'>
			<div className='sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg'>
				<div className='flex flex-col justify-between h-screen pt-2 pb-6 rounded-tr-lg rounded-br-lg'>
					<div>
						<div className='w-max p-2.5'>
							{/* <img src={Logo} alt="" /> */}
							<Image src={Logo} width={60} height={60} />
						</div>
						<ul className='mt-6 space-y-3 tracking-wide'>
							{userRole === 'admin' ? (
								<>
									<li className='min-w-max'>
										<Link
											prefetch
											href='/dashboard/uploadproducts'
											aria-label='dashboard'
											className='relative flex items-center px-4 py-3 space-x-4 text-white bg-gradient-to-r from-sky-600 to-cyan-400'
										>
											<BiChevronsRight size={25} />
											<span className='-mr-1 font-medium'>
												Upload Products
											</span>
										</Link>
									</li>
									<li className='min-w-max'>
										<Link
											prefetch
											href='/dashboard/uploadproducts'
											aria-label='dashboard'
											className='relative flex items-center px-4 py-3 space-x-4 text-white bg-gradient-to-r from-sky-600 to-cyan-400'
										>
											<BiChevronsRight size={25} />
											<Link
												href='/'
												onClick={() => signOut()}
											>
												<span className='-mr-1 font-medium'>
													Logout
												</span>
											</Link>
										</Link>
									</li>
								</>
							) : (
								<>
									{users?.map((u) => (
										<li key={u.name} className='min-w-max'>
											<Link
												prefetch
												href={u?.pathname}
												aria-label='dashboard'
												className='relative flex items-center px-4 py-3 space-x-4 text-white bg-gradient-to-r from-sky-600 to-cyan-400'
											>
												{u.icon}

												<span className='-mr-1 font-medium'>
													{u.name}
												</span>
											</Link>
										</li>
									))}
									<li className='min-w-max'>
										<Link
											prefetch
											href='/'
											onClick={() => signOut()}
											aria-label='dashboard'
											className='relative flex items-center px-4 py-3 space-x-4 text-white bg-gradient-to-r from-sky-600 to-cyan-400'
										>
											<BiChevronsRight size={25} />

											<span className='-mr-1 font-medium'>
												Logout
											</span>
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
					<div className='-mb-3 w-max'>
						<a
							href='#'
							className='flex items-center px-4 py-3 space-x-4 text-gray-600 rounded-md group'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-5 h-5 group-hover:fill-cyan-600'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='group-hover:text-gray-700'>
								Settings
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Sidebar;
