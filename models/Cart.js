const pool = require('../config/database');

const Cart = {
  create: async (usuario_id) => {
    const query = `
      INSERT INTO carrito (usuario_id, total, fecha_creacion)
      VALUES ($1, 0, NOW())
      RETURNING id, usuario_id, total, fecha_creacion
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows[0];
  },

  findByUserId: async (usuario_id) => {
    const query = 'SELECT * FROM carrito WHERE usuario_id = $1';
    const result = await pool.query(query, [usuario_id]);
    return result.rows[0];
  },
};

module.exports = Cart;
