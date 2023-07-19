import connect from "@/middleware/mongoose";
import Sellers from "@/models/seller";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connect();
    console.log("hello 12");
    // Fetch sellers from the database
    const sellers = await Sellers.find({});

    // Return the sellers as a JSON response
    return new NextResponse.JSON({
      sellers,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse.JSON(
      JSON.stringify({ error: 'Database Error' }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    await connect();
    const body = await request.json();
    console.log(body);
    let seller = await Sellers.create(body);
    console.log(seller);
    // Note the correction in the variable name: sellers -> seller
    return new NextResponse.JSON({ seller });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
