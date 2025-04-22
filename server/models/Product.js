const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    brand: { type: String },
    imageUrl: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    // Thêm các trường khác nếu cần: size, color, ratings, reviews...
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;