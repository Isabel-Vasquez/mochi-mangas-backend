const Review = require('../models/Review');

const addReview = async (req, res) => {
  const { producto_id, valoracion, comentario, usuario } = req.body;
  const { userId } = req.user;

  try {
    const newReview = await Review.add({
      producto_id,
      usuario_id: userId,
      valoracion,
      comentario,
      usuario,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.findByProductId(productId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addReview, getReviewsByProductId };
