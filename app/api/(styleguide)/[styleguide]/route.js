import connect from '@/middleware/mongoose';
import Styleguide from '@/models/Styleguide';

import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
	const { styleguide } = params;
	try {
		await connect();
		// Extract query parameters
		const searchParams = new URL(request.url).searchParams;
		const page = searchParams.get('page') || 1;

		const perPage = 10;

		// Calculate skip value for pagination
		const skip = (page - 1) * perPage;
		const styleCategory = await Styleguide.find({ type: styleguide })
			.skip(skip)
			.limit(perPage);
		// Get total number of products
		const totalProducts = await Styleguide.countDocuments({});

		// Calculate total number of pages
		const totalPages = Math.ceil(totalProducts / perPage);
		return NextResponse.json({
			product: styleCategory,
			count: styleCategory.length,
			currentPage: parseInt(page),
			totalPages,
			perPage,
		});
	} catch (err) {
		console.log(err);
		return new NextResponse(`No product with category : ${styleguide}`);
	}
}
