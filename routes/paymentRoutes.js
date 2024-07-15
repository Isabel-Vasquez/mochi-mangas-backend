const express = require('express');
const router = express.Router();
const {
  createPayment,
  getUserPurchases,
} = require('../controllers/paymentController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/', authenticateToken, createPayment);
router.get('/', authenticateToken, getUserPurchases);

module.exports = router;
