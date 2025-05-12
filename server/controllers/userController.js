const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // phân trang: const pageSize = 10; const page = Number(req.query.pageNumber) || 1;
  // const count = await User.countDocuments();
  // const users = await User.find({}).limit(pageSize).skip(pageSize * (page - 1)).select('-password');
  const users = await User.find({}).select('-password'); // Lấy tất cả user, loại bỏ trường password
  res.json(users);
  // res.json({ users, page, pages: Math.ceil(count / pageSize) }); // Nếu có phân trang
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password'); // Loại bỏ password
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // Chỉ admin mới có thể thay đổi role
    if (req.body.role !== undefined) {
         // kiểm tra không cho admin tự đổi role của mình nếu cần
          if (req.user._id.toString() === user._id.toString() && req.body.role !== 'admin') {
             res.status(400);
             throw new Error('Admins cannot change their own role.');
          }
        user.role = req.body.role;
    }


    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
     // Ngăn admin tự xóa chính mình
     if (user.role === 'admin' && req.user._id.toString() === user._id.toString()) {
         res.status(400);
         throw new Error('Cannot delete own administrator account.');
     }
      // Cân nhắc về việc xóa cứng hay mềm (soft delete)
      // Nếu xóa cứng, các đơn hàng hoặc dữ liệu liên quan có thể bị mồ côi.
      // await user.remove(); // Hoặc user.deleteOne() 
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};