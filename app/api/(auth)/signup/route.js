import connect from '@/middleware/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

export async function POST(request) {
	try {
		await connect();
		const body = await request.json();
		console.log(body);

		const {
			firstName,
			lastName,
			email,
			phone,
			role,
			password,
			storeName,
			country,
			address,
			zipcode,
			state,
		} = body;
		const isEmailExist = await User.findOne({ email });
		if (isEmailExist) {
			return NextResponse.json({
				error: true,
			});
		}
		let user = new User({
			firstName,
			lastName,
			phone,
			email,
			role,
			password: CryptoJS.AES.encrypt(
				String(password),
				'secret123'
			).toString(),
			storeName,
			country,
			address,
			zipcode,
			state,
		});

		if (role === 'user' || role === 'admin') {
			user.storeName = null;
			user.country = null;
			user.address = null;
			user.zipcode = null;
			user.state = null;
		}

		await user.save();

		return NextResponse.json({ success: true });
	} catch (err) {
		 console.log("Hello Error",err);
		return new NextResponse(`Database Error: ${err.message}`, {
			status: 500,
		});
	}
}
