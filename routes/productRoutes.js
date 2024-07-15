const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, createProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
