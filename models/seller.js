const mongoose = require('mongoose');
const nftRequestSchema = new mongoose.Schema({
  sellerName: {
    type: String,
    required: true,
  },
  sellerAddress: {
    type: String,
    required: true,
  },
  sellerEmail: {
    type: String,
    required: true,
    unique: true,
  },
  sellerCreationDate: {
    type: Date,
    required: true,
  },
  
  sellerPhoneNumber: {
    type: Number,
    required: true,
  },
  sellerNidNumber: {
    type: Number,
    required: true,
  },
  sellerimage: {
    type: String, // This field will store the path or URL of the main image for the artwork
    required: true,
  },
});

const seller = mongoose.model('sellers', nftRequestSchema);

module.exports = seller;
