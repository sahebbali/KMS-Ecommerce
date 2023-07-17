import React from 'react';
import { useSwiper } from 'swiper/react';
import {
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
	AiOutlineLeft,
	AiOutlineRight,
} from 'react-icons/ai';
const SwiperNavButtons = () => {
	const swiper = useSwiper();

	return (
		<div>
			<div className='lg:flex space-x-4 absolute right-40 top-40  z-10 hidden '>
				<button
					className='rounded-full bg-white p-2'
					onClick={() => swiper.slidePrev()}
				>
					<AiOutlineArrowLeft size={30} className='text-black' />
				</button>
				<button
					className='rounded-full bg-white p-2'
					onClick={() => swiper.slideNext()}
				>
					<AiOutlineArrowRight size={30} className='text-black' />
				</button>
			</div>
			<div className='lg:hidden'>
				<div className='flex space-x-4 absolute left-5 top-14 z-10   '>
					<button
						className='rounded-full '
						onClick={() => swiper.slidePrev()}
					>
						<AiOutlineLeft className='text-black' />
					</button>
				</div>
				<div className='flex space-x-4 absolute right-5 top-14 z-10 '>
					<button
						className='rounded-full  '
						onClick={() => swiper.slideNext()}
					>
						<AiOutlineRight className='text-black' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SwiperNavButtons;
