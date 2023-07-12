const Users = require('../../database/models/index').User;
const HTTPError = require('../utils/errors/httpError');
const passwordUtil = require('../utils/passwordUtil');
const tokenUtil = require('../utils/tokenUtil');
const { UniqueConstraintError } = require('sequelize');

const createUser = async (email, password) => {
  try {
    const encryptedPassword = await passwordUtil.encryptPassword(password);
    const user = await Users.create({ email: email, password: encryptedPassword, isAdmin: false });
    return user.dataValues;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      console.log('Error');
      throw new HTTPError('Username already exists', 400);
    }
    throw new HTTPError(500, 'Internal server error', 500);
  }
};

const loginUser = async (email, password) => {
  const user = await Users.findOne({ where: { email: email } });
  if (!user)
    throw new HTTPError('User not found', 400);

  const checkIfPasswordIsValid = await passwordUtil.checkEncryptedPassword(user.password, password);
  if (!checkIfPasswordIsValid)
    throw new HTTPError('Invalid password', 401);
  const newToken = await tokenUtil.generateToken(user.id);
  return { user, token: newToken, email };
};

const checkTokenValidity = async (token) => {
  const decodedToken = await tokenUtil.verifyToken(token);
  if (!decodedToken)
    throw new HTTPError('Invalid token', 401);
  return decodedToken;
};

const loginAdmin = async (email, password) => {
  const user = await Users.findOne({ where: { email: email, isAdmin: true } });
  if (!user)  
    throw new HTTPError('User not found', 400);
  if (user.isAdmin !== true)
    throw new HTTPError('User is not an admin', 401);
  const checkIfPasswordIsValid = await passwordUtil.checkEncryptedPassword(user.password, password);
  if (!checkIfPasswordIsValid)  
    throw new HTTPError('Invalid password', 401);
  const newToken = await tokenUtil.generateToken(user.id);
  return { user, token: newToken };
};

module.exports = { createUser, loginUser, checkTokenValidity, loginAdmin };