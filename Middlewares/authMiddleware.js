const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserAuthMiddleware = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({
      errMessage: 'Access Denied!!',
    });
  }

  const verifyToken = await jwt.verify(token, process.env.UserToken, (err, decode) => {
    if (err) {
      // console.log(err);
      return res.status(401).json({
        errMessage: 'Can not perform this. Please Login to continue',
      });
    }
    return decode;
  });
  if (!verifyToken) {
    return res.status(401).json({
      errMessage: 'Verification Failed!!',
    });
  }

  req.user = verifyToken._id;
  next();
};


module.exports.UserAuthMiddleware = UserAuthMiddleware;
