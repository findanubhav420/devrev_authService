const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (id, isAdmin) => {
  let token = jwt.sign(
    { 
      id: id,
      role: isAdmin 
    },
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