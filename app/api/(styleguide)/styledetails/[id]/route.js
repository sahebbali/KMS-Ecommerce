import connect from "@/middleware/mongoose";
import { NextResponse } from "next/server";
import Styleguide from "@/models/Styleguide";
export async function GET(request, { params }) {
  const { id: styleId } = params;
  try {
    await connect();
    const product = await Styleguide.findOne({ _id: styleId });
    return NextResponse.json({ product });
  } catch (err) {
    return new NextResponse(`No style with id : ${styleId}`);
  }
}
