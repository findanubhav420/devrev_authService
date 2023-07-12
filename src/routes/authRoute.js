const AuthController = require('../controllers/authController');
const {validationMiddleware, userSchema} = require('../middlewares/validation');
const Router = require('express').Router;
const router = Router();

router.post('/userRegister', validationMiddleware(userSchema), AuthController.createUser);
router.post('/userLogin', validationMiddleware(userSchema), AuthController.loginUser);
router.post('/adminLogin', validationMiddleware(userSchema), AuthController.loginAdmin);
router.get('/token/validate', AuthController.checkTokenValidity);
module.exports = { router };