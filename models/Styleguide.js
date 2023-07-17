const mongoose = require("mongoose");

const StyleguideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },
    // description: {
    //   type: String,
    //   required: [true, "Please provide product description"],
    //   maxlength: [1000, "Description can not be more than 1000 characters"],
    // },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
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

    quantity: {
      type: Number,
      required: true,
      default: 15,
    },

    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.models.Styleguide ||
  mongoose.model("Styleguide", StyleguideSchema);
