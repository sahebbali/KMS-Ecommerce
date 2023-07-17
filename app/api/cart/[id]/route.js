import { NextResponse } from "next/server";
import connect from "@/middleware/mongoose";
import Cart from "@/models/Cart";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  const email = request.headers.get("email");


  console.log(id, email);

  await connect();
  try {

    const cartItem = await Cart.findOneAndRemove({
      productId: id,
      email: email,
    });

    if (!cartItem) {
      return new NextResponse("Cart item not found", { status: 404 });
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
  await connect();
  try {
    // Find cart items based on the id parameter
    const cartItems = await Cart.find({ email: id });
    /* 		console.log(cartItems); */
    return NextResponse.json({ cartItems });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
