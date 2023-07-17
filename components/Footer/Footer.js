import Image from 'next/image';
import React from 'react';
import Logo from '@/public/logo/logo-light.png';
import Link from 'next/link';
import { AiFillInstagram, AiOutlineArrowRight } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
const Footer = () => {
	return (
		<section className='bg-[#181818] text-white w-full mt-20'>
			<div className='flex flex-col lg:space-y-6 '>
				{/* for logo */}
				<div className='flex flex-col space-y-4'>
					<div className='mx-auto pt-4'>
						<Image src={Logo} width={120} height={120} alt='logo' />
					</div>
					<div className='grid grid-rows-3 lg:flex  items-center justify-center lg:space-x-4 text-center tracking-wider'>
						<div>
							<h4 className='text-base font-semibold mb-2'>
								DELIVERY & RETURNS
							</h4>
							<p>Free Next Day UK delivery on all over $350</p>
							<Link href='/' className='underline'>
								See More
							</Link>
						</div>
						<div className=''>
							<h4 className='text-base font-semibold mb-2 '>
								DELIVERY & RETURNS
							</h4>
							<p>Free Next Day UK delivery on all over $350</p>
							<Link href='/' className='underline'>
								See More
							</Link>
						</div>
						<div className='b'>
							<h4 className='text-base font-semibold mb-2'>
								DELIVERY & RETURNS
							</h4>
							<p>Free Next Day UK delivery on all over $350</p>
							<Link href='/' className='underline'>
								See More
							</Link>
						</div>
					</div>
					<hr />
				</div>
				{/* email */}
				<div className='flex items-center justify-center flex-col py-8 space-y-4 '>
					<h2 className='uppercase tracking-widest font-semibold text-xl text-center'>
						Sign Upto Our News Letter List
					</h2>
					<div className='mx-auto w-full flex justify-center items-center '>
						<div className='flex items-center justify-center border-b border-white w-1/2 py-3 '>
							<input
								type='email'
								name=''
								id=''
								className='bg-[#181818] text-white text-center focus:outline-none'
								placeholder='EMAIL ADDRESS'
							/>
							<div>
								<AiOutlineArrowRight size={24} />
							</div>
						</div>
					</div>
					<div className='flex justify-center items-center space-x-4 pt-4'>
						<FaFacebookF size={22} />
						<AiFillInstagram size={26} />
					</div>
				</div>
				{/* house address */}
				<div className='flex flex-col lg:grid lg:grid-cols-12 border-y border-white '>
					<div className='col-span-6 lg:border-r border-white flex flex-col lg:flex-row lg:justify-center lg:items-center lg:space-x-8 space-y-4 p-8 lg:p-0'>
						<div className='lg:flex justify-center items-center  '>
							<Image
								src='https://source.unsplash.com/3k5cAmxjXl4/320x320'
								alt='footer image'
								width={320}
								height={320}
								className='lg:py-16'
							/>
						</div>
						<div className='space-y-2  '>
							<h4 className='text-base text-gray-400 uppercase'>
								Your Nearest Store
							</h4>
							<p className='text-base'>49 CHILTERN STREET</p>
							<p className='text-sm'>
								Bella Freud
								<br />
								49 Chiltern Street
							</p>
							<p className='text-sm'>
								London
								<br />
								W1U 6LY
							</p>
							<p className='text-sm'>
								T:+44 (0) 207935 0777
								<br />
								Nearest tube station: Baker Street
								<br />
								Opening times: Mon - Sat 10am - 6pm
								<br />
								Monday 29th May - 12pm - 5pm
							</p>
							<p>
								<Link href='/'>View Store</Link>
							</p>
						</div>
					</div>
					<div className='col-span-6 grid grid-cols-2 grid-rows-3 uppercase tracking-widest'>
						<div className='border-b border-t lg:border-t-0 border-r flex items-center justify-center'>
							Biography
						</div>
						<div className='border-b border-t lg:border-t-0  flex items-center justify-center'>
							Filmography
						</div>
						<div className='border-b border-r flex items-center justify-center'>
							Happenings
						</div>
						<div className='border-b flex items-center justify-center'>
							My Accounts
						</div>
						<div className='border-r flex items-center justify-center text-center'>
							Delivery & returns
						</div>
						<div className='flex items-center justify-center'>
							Contact Us
						</div>
					</div>
				</div>
				{/* links of site */}
				<div className='lg:flex items-center justify-between lg:container lg:mx-auto text-sm space-y-4 lg:space-y-0  '>
					<div className='text-center lg:text-left pt-4 lg:pt-0'>
						© 2022 Bella Freud
					</div>
					<ul className='flex space-x-4 pl-4 lg:pl-0'>
						<li>Careers</li>
						<li>Stockists </li>
						<li>Privacy & Policy </li>
						<li>Notice Legal</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Footer;
