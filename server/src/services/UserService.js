const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

// Đăng kí người dùng
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser !== null) {
        resolve({
          status: "OK",
          message: "The email is already exists",
        });
      }
      const hash = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Create user success",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Đăng nhập người dùng
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "The password or user is not correct",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "Login success",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật người dùng
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      const updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Login success",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa người dùng
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete({ _id: id });
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy thông tin tất cả người dùng
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: " success",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy thông tin chi tiết người dùng
const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });

      if (user === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "success",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  
};
