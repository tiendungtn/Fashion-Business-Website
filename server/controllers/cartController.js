const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product'); 
// Cần để kiểm tra sản phẩm tồn tại

// Helper function để trả về giỏ hàng đã populate
const getPopulatedCart = async (userId) => {
    const user = await User.findById(userId).populate('cart.product', 'name price imageUrl countInStock');
    if (!user) return null;
    // Lọc ra những item mà sản phẩm không còn tồn tại 
    user.cart = user.cart.filter(item => item.product !== null);
    await user.save(); 
    return user.cart;
}

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await getPopulatedCart(req.user._id);
   if (cart) {
       res.json(cart);
   } else {
       res.status(404);
       throw new Error('Người dùng không tồn tại');
   }
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // 1. Kiểm tra sản phẩm tồn tại và đủ hàng
  const product = await Product.findById(productId);
  if (!product) {
      res.status(404);
      throw new Error('Sản phẩm không tìm thấy');
  }
   if (product.countInStock < quantity) {
       res.status(400);
       throw new Error('Sản phẩm đã hết hàng');
   }


  // 2. Tìm user và cập nhật giỏ hàng
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Người dùng không tồn tại');
  }

  // 3. Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingCartItemIndex = user.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingCartItemIndex > -1) {
    // Nếu đã tồn tại, cập nhật số lượng
    user.cart[existingCartItemIndex].quantity += quantity;
     // Kiểm tra lại số lượng tồn kho sau khi cộng dồn
     if (product.countInStock < user.cart[existingCartItemIndex].quantity) {
         res.status(400);
         throw new Error('Thêm số lượng vượt quá giới hạn kho');
     }
  } else {
    // Nếu chưa tồn tại, thêm mới vào mảng cart
    user.cart.push({ product: productId, quantity });
  }

  await user.save(); // Lưu thay đổi vào database
  const updatedCart = await getPopulatedCart(userId); // Lấy lại giỏ hàng mới nhất đã populate
  res.status(200).json(updatedCart);
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/update/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.user._id;

    if (quantity <= 0) {
        // Nếu số lượng <= 0 thì coi như xóa
        return removeItemFromCart(req, res); // Gọi hàm xóa
    }

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404); throw new Error('Sản phẩm không tìm thấy');
    }
    if (product.countInStock < quantity) {
        res.status(400); throw new Error('Sản phẩm đã hết hàng');
    }


    const user = await User.findById(userId);
    if (!user) {
        res.status(404); throw new Error('Người dùng không tồn tại');
    }

    const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        user.cart[itemIndex].quantity = quantity;
        await user.save();
        const updatedCart = await getPopulatedCart(userId);
        res.json(updatedCart);
    } else {
        res.status(404);
        throw new Error('Không tìm thấy hàng trong giỏ');
    }
});


// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
   if (!user) {
       res.status(404); throw new Error('Người dùng không tồn tại');
   }

  // Lọc ra các item không phải là productId cần xóa
  user.cart = user.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();
  const updatedCart = await getPopulatedCart(userId);
  res.json(updatedCart);
});

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404); throw new Error('Người dùng không tồn tại');
    }
    user.cart = []; // Xóa sạch mảng cart
    await user.save();
    res.json([]); // Trả về mảng rỗng
});


module.exports = { getCart, addItemToCart, updateCartItem, removeItemFromCart, clearCart };