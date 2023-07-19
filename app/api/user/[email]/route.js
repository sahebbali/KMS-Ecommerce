import connect from '@/middleware/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
export const GET = async (request, { params }) => {
	const { email } = params;

	try {
		await connect();
		// Find user items based on the id parameter
		const user = await User.findOne({ email });
		console.log("My us:", user);
		if (user) {
			return NextResponse.json(user);
		} else {
			// Handle case when user is not found
			return new NextResponse('User not found', { status: 404 });
		}
	} catch (err) {
		console.error(err);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};

//update the user info
export const PUT = async (request, { params }) => {
	const { email } = params;
	try {
		await connect();
		const body = await request.json();
		// Find the user based on the email parameter
		const user = await User.findOne({ email });

		if (!user) {
			return new NextResponse('User not found', { status: 404 });
		}
		const { firstName, lastName, newEmail, phone } = body;
		console.log(request.body);
		// Update the user information with the request body data
		user.firstName = firstName || user.firstName;
		user.lastName = lastName || user.lastName;
		user.phone = phone || user.phone;
		user.email = newEmail || user.email;

		// Save the updated user
		await user.save();

		return new NextResponse('User information updated successfully');
	} catch (error) {
		console.error(
			'An error occurred while updating user information:',
			error
		);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};
