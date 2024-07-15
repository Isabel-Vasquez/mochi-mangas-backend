const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
} = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const validateLogin = require('../middlewares/validateLogin');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/register', validateUser, createUser);
router.post('/login', validateLogin, loginUser);
router.get('/', getAllUsers);
router.put('/', authenticateToken, updateUser);

module.exports = router;
