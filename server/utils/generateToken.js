const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d', // Token hết hạn sau từng này ngày
  });
};

module.exports = generateToken;