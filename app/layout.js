'use client';
import Navbar from '@/components/Navbar/Navbar';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import Loading from './loading';
// import { motion, useScroll } from "framer-motion";
/* import { Inter } from 'next/font/google'; */
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import { LoadingProvider } from '@/components/Context/LoadingContext';
import Providers from '@/components/Providers';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
// 	title: 'Fast Sell',
// 	description: 'Generated by Fast Sell',
// };
export default function Layout({ children }) {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		// Simulate an asynchronous operation
		setTimeout(() => {
			setLoading(false); // Set loading status to false after the content is loaded
		}, 1000); // Replace with your actual content loading code
	}, []);
	const pathname = usePathname();
	const name = [
		'/dashboard',
		'/dashboard/orders',
		'/dashboard/account-info',
		'/dashboard/change-password',
		'/dashboard/wishlist',
		'/dashboard/uploadproducts',
		'/sales',
	];

	return (
		<html lang='en'>
			{loading ? (
				<Loading />
			) : (
				<LoadingProvider>
					<Providers>
						<body>
							{!name.includes(pathname) && <Navbar />}
							{children}
							{!name.includes(pathname) && <Footer />}
						</body>
					</Providers>
				</LoadingProvider>
			)}
		</html>
	);
}
