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

export async function PUT(request,{params}) {
	
	const { id: productId } = params;
	try {
		await connect();
		const updatedProduct = await Products.findByIdAndUpdate(
			productId,
			{ status: 'fulfilled' },
			{ new: true }
		  );
	
		  if (!updatedProduct) {
			return res.status(404).json({ error: 'Product not found' });
		  }
	
		  return res.json(updatedProduct);
	} catch (err) {
		return new NextResponse(`No product with id : ${productId}`);
	}
	// try {
	//   await connect();
	//   const body = await request.json();
	//   console.log(body)
	//   let product = await Products.create(body);
	//   console.log(product);
	//   // await products.save();
	//   return NextResponse.json({ product });
	// } catch (err) {
	//   console.log(err)
	//   return new NextResponse("Database Error", { status: 500 });
	// }
  }
  