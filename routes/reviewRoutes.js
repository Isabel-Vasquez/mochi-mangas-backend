const express = require('express');
const {
  addReview,
  getReviewsByProductId,
} = require('../controllers/reviewController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/', authenticateToken, addReview);
router.get('/:productId', getReviewsByProductId);

module.exports = router;
