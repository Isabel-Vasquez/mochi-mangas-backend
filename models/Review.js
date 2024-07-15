const pool = require('../config/database');

const Review = {
  add: async ({ producto_id, usuario_id, valoracion, comentario, usuario }) => {
    const query = `
      INSERT INTO valoraciones (producto_id, usuario_id, valoracion, comentario, fecha_valoracion, usuario)
      VALUES ($1, $2, $3, $4, NOW(), $5)
      RETURNING id, producto_id, usuario_id, valoracion, comentario, fecha_valoracion, usuario
    `;
    const values = [producto_id, usuario_id, valoracion, comentario, usuario];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findByProductId: async (producto_id) => {
    const query = 'SELECT * FROM valoraciones WHERE producto_id = $1';
    const result = await pool.query(query, [producto_id]);
    return result.rows;
  },
};

module.exports = Review;
