import nodemailer from 'nodemailer';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import connect from '@/middleware/mongoose';
import CryptoJS from 'crypto-js';

export async function POST(request) {
	await connect();
	const body = await request.json();

	if (body.sendMail) {
		const token = 'fastsell';
		const emailContent = `
      We have sent you this email in response to your request to reset your password on fastsell.com.
      To reset your password, please follow the link below:
      <a href="http://localhost:3000/forgot?token=${token}">Click here to reset your password</a>
      <br/><br/>
      We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and changing your password.
      <br/><br/>
    `;

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'kwsfastsell@gmail.com',
				pass: 'lcsuhcogxlxlexky',
			},
		});

		const mailOptions = {
			from: 'kwsfastsell@gmail.com',
			to: body.email,
			subject: 'Reset password',
			html: emailContent,
		};

		try {
			await transporter.sendMail(mailOptions);
			console.log('Email sent');
			return NextResponse.json({
				success: true,
				message: 'Password reset email sent',
			});
		} catch (error) {
			console.error(error);
			return NextResponse.json({
				success: false,
				message: 'Error sending email',
			});
		}
	} else {
		const { email, password } = body;
		console.log(email);

		if (!email) {
			return NextResponse.json({
				success: false,
				message: 'Email is required',
			});
		}

		try {
			const user = await User.findOne({ email }).maxTimeMS(30000);

			if (!user) {
				return NextResponse.json({
					success: false,
					message: 'User not found',
				});
			}

			user.password = CryptoJS.AES.encrypt(
				password,
				'secret123'
			).toString();
			await user.save();

			return NextResponse.json({
				success: true,
				message: 'Password reset successful',
			});
		} catch (error) {
			console.error(error);
			return NextResponse.json({
				success: false,
				message: 'Error resetting password',
			});
		}
	}
}
