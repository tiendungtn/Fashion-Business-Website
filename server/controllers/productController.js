const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// --- Admin Routes ---

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // Lấy dữ liệu từ req.body (cần validate)
  const { name, price, description, imageUrl, brand, category, countInStock, rating, numReviews, size, color } = req.body;

  const product = new Product({
    name,
    price,
    description,
    imageUrl, // Cần xử lý upload ảnh thực tế
    brand,
    category,
    countInStock,
    rating,
    numReviews,
    size,
    color,
    user: req.user._id // Lưu lại người tạo nếu cần
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, imageUrl, brand, category, countInStock, rating, numReviews, size, color } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price ?? product.price; // Dùng ?? để cho phép giá trị 0
    product.description = description || product.description;
    product.imageUrl = imageUrl || product.imageUrl;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock ?? product.countInStock; 
    product.rating = rating ?? product.rating; 
    product.numReviews = numReviews ?? product.numReviews; 
    product.size = size || product.size;
    product.color = color || product.color;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne(); 
    res.json({ message: 'Sản phẩm đã được xoá' });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};