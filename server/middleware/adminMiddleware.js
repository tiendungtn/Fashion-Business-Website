const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); 
    } else {
      res.status(403); 
      throw new Error('Không thể xác thực, người dùng không phải admin');
    }
  };
  
  module.exports = { isAdmin };