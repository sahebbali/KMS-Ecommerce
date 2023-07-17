import connect from "@/middleware/mongoose";
import Products from "@/models/Products";
import { NextResponse } from "next/server";

// get all product
export async function GET(request) {
  try {
    await connect();
    // console.log(request.url);

    // Extract query parameters
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get("page") || 1;

    const perPage = 10;

    // Calculate skip value for pagination
    const skip = (page - 1) * perPage;

    // Fetch products with pagination
    const products = await Products.find({}).skip(skip).limit(perPage);

    // Get total number of products
    const totalProducts = await Products.countDocuments({});

    // Calculate total number of pages
    const totalPages = Math.ceil(totalProducts / perPage);

    return NextResponse.json({
      products,
      currentPage: parseInt(page),
      totalPages,
      perPage,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    await connect();
    const body = await request.json();
    console.log(body)
    let product = await Products.create(body);
    console.log(product);
    // await products.save();
    return NextResponse.json({ product });
  } catch (err) {
    console.log(err)
    return new NextResponse("Database Error", { status: 500 });
  }
}
