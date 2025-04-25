const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler'); 

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token từ header (Bỏ chữ 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user theo ID trong token, loại bỏ password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
         res.status(401);
         throw new Error('Không thể xác thực, người dùng không tìm thấy');
      }

      next(); // Đi tiếp nếu xác thực thành công
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Không thể xác thực, lỗi token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Không thể xác thực, không tìm thấy token');
  }
});

module.exports = { protect };