const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      minlength: [5, "Name can not be more than 100 characters"],
    },
    price: {
      type: String,
      required: [true, "Please provide product price"],
    },
    desc: {
      type: String,
      required: [true, "Please provide product description"],
      minlength: [5, "Description can not be more than 1000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    sellerSKU: {
      type: String,
      default: "1111",
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["men", "women", "leatherGoods", "jewelry"],
    },
    subcategory: {
      type: String,
      required: [true, "Please provide product sub category"],
    },
    color: {
      type: [String],
      default: ["red", "black", "blue"],
      required: true,
    },
    size: {
      type: [String],
      default: ["s", "m", "l", "xl"],
      required: true,
    },
    available: {
      type: [String],
      default: ["yes", "no"],
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 15,
    },
    dimension: {
      type: Number,
      default: 1,
    },
    weight: {
      type: Number,
      default: 1,
    },
    nftStock: {
      type: Number,
      default: 1,
    },
    offprintStock: {
      type: Number,
      default: 1,
    },
    stock: {
      type: [String],
      default: ["in", "out"],
      required: true,
    },
    version: {
      type: [String],
      default: ["nft", "offprint", "3d"],
      required: true,
    },
    email: {
			type: String,
		},
  },
  { timestamps: true }
);

export default mongoose.models.Products ||
  mongoose.model("Products", ProductSchema);
