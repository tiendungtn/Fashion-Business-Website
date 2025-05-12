const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const router = express.Router();

// Áp dụng middleware protect và isAdmin cho tất cả các route trong file này
router.use(protect);
router.use(isAdmin);

// Định nghĩa các route
router.route('/')
  .get(getUsers); // GET /api/users

router.route('/:id')
  .get(getUserById)      // GET /api/users/:id
  .put(updateUser)       // PUT /api/users/:id
  .delete(deleteUser);   // DELETE /api/users/:id

module.exports = router;