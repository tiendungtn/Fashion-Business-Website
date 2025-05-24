const Product = require("../models/ProductModel");

// Tạo sản phẩm mới
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock,rating , description } = newProduct;
    try {
      const checkProduct = await Product.findOne({ name: name });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The name of product is already exists",
        });
      }

      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "Create user success",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật sản phẩm
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      const updatedProduct = await Product.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Updated success",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Xoá sản phẩm
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete({ _id: id });
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy thông tin tất cả sản phẩm
const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
     
      if(filter){
          const label = filter[0];
          
          const allObjectFilter = await  Product.find({
                [label] : { '$regex': filter[1] }
          }).limit(limit).skip(page * limit)
        
        resolve({
            status: "OK",
            message: "success",
            data: allObjectFilter,
            total: totalProduct,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalProduct / limit),
      })
      }
      if(sort){
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort);
        
        resolve({
            status: "OK",
            message: "success",
            data: allProductSort,
            total: totalProduct,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalProduct / limit),
      })
    }
      const allProduct = await Product.find().limit(limit).skip(page * limit);
      resolve({
        status: "OK",
        message: "success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      })
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy thông tin chi tiết sản phẩm
const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: id });

      if (product === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "success",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};
