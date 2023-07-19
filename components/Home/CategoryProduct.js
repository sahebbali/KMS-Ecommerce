'use client';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FiChevronsRight } from 'react-icons/fi';
import products from '@/utils/categoryProducts';
import './CategoryProduct.css';
import { motion } from 'framer-motion';
import { useLoadingContext } from '../Context/LoadingContext';

const CategoryProduct = () => {
	const { handleLinkClick } = useLoadingContext();
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 2,

		speed: 3000,

		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					autoplay: true,
					autoplaySpeed: 3000,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<section className=' '>
			<div className=''>
				<Slider {...settings}>
					{products.map((product) => (
						<Link
							href={`/collections/${product.category}`}
							key={product._id}
							className='pb-10 '
							onClick={() =>
								handleLinkClick(
									`/collections/${product.category}`
								)
							}
						>
							<div className='space-y-4 pr-[1.5px]'>
								<div className=''>
									<Image
										src={product.image}
										alt='product-image'
										className=' w-full'
										width={240}
										height={327}
									/>
								</div>
								<motion.div whileHover={{ scale: 1.1 }}>
									<div className='mx-auto w-2/3  text-center flex items-center justify-center space-x-4 py-2 shadow-md rounded-xl capitalize border border-slate-300 '>
										<button className='capitalize text-lg '>
											{product.category}
										</button>
										<FiChevronsRight size={26} />
									</div>
								</motion.div>
							</div>
						</Link>
					))}
				</Slider>
			</div>
		</section>
	);
};

export default CategoryProduct;
