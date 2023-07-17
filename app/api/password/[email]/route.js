import connect from "@/middleware/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
//update user password
export const PUT = async (request, { params }) => {
  const { email } = params;
  console.log(email);
  try {
    await connect();
    const body = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (decryptedPass !== body.ppassword) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid current password" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    user.password = CryptoJS.AES.encrypt(body.password, "secret123").toString();

    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "Password reset successful" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("An error occurred while updating user information:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
