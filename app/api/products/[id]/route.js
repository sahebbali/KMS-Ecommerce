import connect from '@/middleware/mongoose';
import Products from '@/models/Products';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
	const { id: productId } = params;
	try {
		await connect();
		const product = await Products.findOne({ _id: productId });
		return NextResponse.json({ product });
	} catch (err) {
		return new NextResponse(`No product with id : ${productId}`);
	}
}
