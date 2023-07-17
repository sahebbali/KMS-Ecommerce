import React from 'react';
import Details from './../../../components/(ProductDetails)/Details';

async function fetchData(url) {
	const res = await fetch(url, {
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch data from ${url}`);
	}

	return res.json();
}

async function getData(params) {
	const firstUrl = `${process.env.NEXT_PUBLIC_HOST}/api/products/${params}`;
	const secondUrl = `${process.env.NEXT_PUBLIC_HOST}/api/styledetails/${params}`;

	try {
		const firstData = await fetchData(firstUrl);
		if (firstData.product === null) {
			const secondData = await fetchData(secondUrl);
			return secondData;
		}

		return firstData;
	} catch (error) {
		console.log('Fetch failed. Error:', error);
		throw error;
	}
}

const page = async ({ params }) => {
	const data = await getData(params.id);

	return (
		<div className='py-6 mt-36 sm:py-8 lg:py-12'>
			<Details data={data} />
		</div>
	);
};
export default page;
