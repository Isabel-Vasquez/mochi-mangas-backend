const express = require('express');
const router = express.Router();
const {
  addFavorite,
  getFavoritesByUser,
  removeFavorite,
} = require('../controllers/favoriteController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', authenticateToken, getFavoritesByUser);
router.post('/', authenticateToken, addFavorite);
router.delete('/:producto_id', authenticateToken, removeFavorite);

module.exports = router;
