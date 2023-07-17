import connect from '@/middleware/mongoose';
import Products from '@/models/Products';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
	const { category } = params;
	console.log(params);
	console.log(category);
	try {
		await connect();
		const totalProducts = await Products.countDocuments({
			category: category,
		});
		// Extract query parameters
		const searchParams = new URL(request.url).searchParams;
		const page = searchParams.get('page') || 1;

		const perPage = 10;

		// Calculate skip value for pagination
		const skip = (page - 1) * perPage;

		// Fetch products with pagination
		const productCategory = await Products.find({ category: category })
			.skip(skip)
			.limit(perPage);

		// Get total number of products

		// Calculate total number of pages
		const totalPages = Math.ceil(totalProducts / perPage);

		return NextResponse.json({
			product: productCategory,
			count: totalProducts,
			currentPage: parseInt(page),
			totalPages,
			perPage,
		});
	} catch (err) {
		return new NextResponse(`No product with category : ${category}`);
	}
}
