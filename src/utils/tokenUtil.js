const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (id) => {
  let token = jwt.sign(
    { id: id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return token;
};
const verifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken)
      return decodedToken;
  } catch (error) {
    return false;
  }

};
module.exports = { generateToken, verifyToken };