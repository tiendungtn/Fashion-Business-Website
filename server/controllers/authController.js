const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad Request
    throw new Error('Người dùng đã tồn tại');
  }

  const user = await User.create({
    name,
    email,
    password, // Password sẽ được hash bởi middleware trong model
  });

  if (user) {
    res.status(201).json({ // Created
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      cart: user.cart, // Trả về giỏ hàng ban đầu (rỗng)
    });
  } else {
    res.status(400);
    throw new Error('Dữ liệu người dùng không hợp lệ');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate('cart.product', 'name price imageUrl'); // Populate để lấy thông tin sản phẩm trong giỏ hàng

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      cart: user.cart,
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Email và mật khẩu không hợp lệ');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user được gắn vào từ middleware 'protect'
  const user = await User.findById(req.user._id).populate('cart.product', 'name price imageUrl');

  if (user) {
    res.json({
       _id: user._id,
       name: user.name,
       email: user.email,
       role: user.role,
       cart: user.cart,
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
});


module.exports = { registerUser, loginUser, getUserProfile };