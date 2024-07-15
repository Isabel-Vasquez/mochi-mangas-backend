const Favorite = require('../models/Favorite');
const pool = require('../config/database');

const addFavorite = async (req, res) => {
  const { userId } = req.user;
  const { producto_id } = req.body;

  try {
    const productResult = await pool.query(
      'SELECT id FROM productos WHERE id = $1',
      [producto_id]
    );
    if (productResult.rows.length === 0) {
      return res.status(400).json({ error: 'Producto no encontrado' });
    }

    const newFavorite = await Favorite.add({ usuario_id: userId, producto_id });
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFavoritesByUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const favorites = await Favorite.findByUserId(userId);
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFavorite = async (req, res) => {
  const { userId } = req.user;
  const { producto_id } = req.params;
  try {
    const deletedFavorite = await Favorite.remove({
      usuario_id: userId,
      producto_id,
    });
    if (!deletedFavorite) {
      return res
        .status(404)
        .json({ message: 'Producto favorito no encontrado' });
    }
    res.json(deletedFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFavorite,
  getFavoritesByUser,
  removeFavorite,
};
