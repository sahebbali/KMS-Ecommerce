const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String },
		phone: { type: String },
		email: { type: String, unique: true, index: true },
		password: { type: String, required: true },
		cpassword: { type: String },
		role: {
			type: String,
			default: 'user',
		},
		storeName: { type: String, default: null },
		address: { type: String, default: null },
		country: { type: String, default: null },
		city: { type: String, default: null },
		state: { type: String, default: null },
		zipcode: { type: String, default: null },
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);