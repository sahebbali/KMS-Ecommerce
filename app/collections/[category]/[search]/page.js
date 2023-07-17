import CategoryCollection from '@/components/CategoryCollection/CategoryCollection';

async function getData(category, subcategory) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_HOST}/api/collections/${category}/${subcategory}`,
		{
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default async function Category({ params }) {
	const data = await getData(params.category, params.search);

	return (
		<div className='container px-10 mx-auto mt-32'>
			<div className='grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4'>
				{data?.filterProducts?.map((product) => (
					<CategoryCollection key={product._id} product={product} />
				))}
				{data?.filterProducts?.length == 0 && (
					<div className='flex justify-center text-center items-center'>
						{' '}
						coming soon
					</div>
				)}
			</div>
		</div>
	);
}
