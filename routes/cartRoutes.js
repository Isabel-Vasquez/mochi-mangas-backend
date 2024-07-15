const express = require('express');
const router = express.Router();
const { createCart, getCartByUser } = require('../controllers/cartController');
const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} = require('../controllers/cartItemController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/', authenticateToken, createCart);
router.get('/', authenticateToken, getCartByUser);
router.post('/items', authenticateToken, addItemToCart);
router.delete('/items/:producto_id', authenticateToken, removeItemFromCart);
router.put('/items', authenticateToken, updateItemQuantity);

module.exports = router;
