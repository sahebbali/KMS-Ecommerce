import { NextResponse } from "next/server";
import connect from "@/middleware/mongoose";
import Wishlist from "@/models/Wishlist";

export async function POST(request) {
  try {
    await connect();
    const body = await request.json();
    const { productId, email } = body;
    console.log(email);
    // Check if the product already exists in the cart collection
    const existingWishlist = await Wishlist.findOne({ productId, email });

    if (existingWishlist) {
      return NextResponse.json({ isInWishlist: true });
    } else {
      // Product not in the wishlist, add it to the collection
      const wishlist = new Wishlist(body);
      await wishlist.save();
      console.log(wishlist);
      return NextResponse.json({ isInWishlist: false, wishlist });
    }
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
