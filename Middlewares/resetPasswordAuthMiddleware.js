const jwt = require('jsonwebtoken');
require('dotenv').config();

const resetPasswordAuth = async (req, res, next) => {
  try {
    const token = req.header('reset-auth-token');
    if (!token) {
      return res.status(401).json({
        errMessage: 'Invalid Token!!',
      });
    }

    const verifyToken = await jwt.verify(token, process.env.resetToken, (err, decode) => {
      if (err) {
        return res.status(401).json({
          errMessage: 'Not Authorized!!',
          err,
        });
      }
      return decode;
    });
    if (!verifyToken) {
      return res.status(401).json({
        errMessage: 'Something went wrong...',
      });
    }
    req.user = verifyToken._id;
    next();
  } catch (error) {
    return res.status(400).json({
      errMessage: 'Something Went Wrong!!',
    });
  }
};

module.exports = resetPasswordAuth;
