'use client';
import Banner from '@/components/Home/Banner';
import StyleGuide from '../components/Home/StyleGuide';
import CategoryProduct from '../components/Home/CategoryProduct';
import Loading from './loading';
import { useLoadingContext } from '@/components/Context/LoadingContext';

const Home = () => {
	const { isLoading } = useLoadingContext();
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className='space-y-16 '>
			<Banner />
			<StyleGuide />
			<CategoryProduct />
		</div>
	);
};

export default Home;
