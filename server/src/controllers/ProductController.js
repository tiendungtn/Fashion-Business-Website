const ProductService = require("../services/ProductService");

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock,rating , description } = req.body;
    if (!name || !image || !type || !price || !countInStock || !rating) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } 
    const response = await ProductService.createProduct(req.body);
    console.log('response', response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

// Lấy thống tin chi tiết sản phẩm
const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

// Lấy thống tin tất cả sản phẩm
const getAllProduct = async (req, res) => {
  try {
    const {limit , page , sort, filter } = req.query;
    const response = await ProductService.getAllProduct(Number(limit) || 8 , Number(page) || 0, sort, filter );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,

};
