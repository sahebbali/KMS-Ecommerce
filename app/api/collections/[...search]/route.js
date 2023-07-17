import connect from '@/middleware/mongoose';
import Products from '@/models/Products';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
	console.log(params);
	const { search } = params;
	const category = search[0];
	const subcategory = search[1];
	try {
		await connect();
		const filterProducts = await Products.find({ category, subcategory });
		/* 	console.log(filterProducts); */
		return NextResponse.json({
			filterProducts,
		});
	} catch (err) {
		console.log(err);
		return NextResponse.json({
			error: "Error on '/api/filterProduct/': " + err,
			status: 400,
		});
	}
}
