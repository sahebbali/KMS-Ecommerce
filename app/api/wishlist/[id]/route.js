import { NextResponse } from "next/server";
import connect from "@/middleware/mongoose";
import Wishlist from "@/models/Wishlist";
export const DELETE = async (request, { params }) => {
  const { id } = params;
  const email = request.headers.get("email");

  console.log(id, email);

  try {
    await connect();

    const wishlistItem = await Wishlist.findOneAndRemove({
      productId: id,
      email: email,
    });

    if (!wishlistItem) {
      return new NextResponse("wishlist item not found", { status: 404 });
    }

    return new NextResponse({ success: true });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  const { id } = params;
  /* 	console.log(id); */
  try {
    await connect();
    // Find cart items based on the id parameter
    const wishlistItem = await Wishlist.find({ email: id });
    /* 		console.log(cartItems); */
    return NextResponse.json({ wishlistItem });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
