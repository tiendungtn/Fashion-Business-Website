const express = require('express');
const {
    getCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Tất cả các route trong cart đều yêu cầu đăng nhập (protect)
router.route('/')
    .get(protect, getCart);

router.route('/add')
    .post(protect, addItemToCart);

router.route('/update/:productId')
    .put(protect, updateCartItem);

router.route('/remove/:productId')
    .delete(protect, removeItemFromCart);

router.route('/clear')
    .delete(protect, clearCart);


module.exports = router;