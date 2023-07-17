const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please provide product name'],
			maxlength: [100, 'Name can not be more than 100 characters'],
		},
		image: {
			type: String,
			required: [true, 'Please provide product image'],
			default: 'image.jpg',
		},
		price: {
			type: String,
			required: [true, 'Please provide product price'],
		},
		color: {
			type: [String],
			required: true,
		},
		size: {
			type: [String],
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			default: 15,
		},
		email: {
			type: String,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Products',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
