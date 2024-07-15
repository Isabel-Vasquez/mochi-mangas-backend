const express = require('express');
const {
  addItemToCart,
  removeItemFromCart,
} = require('../controllers/cartItemController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/', authenticateToken, addItemToCart);
router.delete('/:producto_id', authenticateToken, removeItemFromCart);

module.exports = router;
