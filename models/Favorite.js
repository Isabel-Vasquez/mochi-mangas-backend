const pool = require('../config/database');

const Favorite = {
  add: async ({ usuario_id, producto_id }) => {
    const query = `
      INSERT INTO favoritos (usuario_id, producto_id, fecha_agregado)
      VALUES ($1, $2, NOW())
      RETURNING id, usuario_id, producto_id, fecha_agregado
    `;
    const values = [usuario_id, producto_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findByUserId: async (usuario_id) => {
    const query = `
      SELECT f.id, f.usuario_id, f.producto_id, f.fecha_agregado, p.titulo, p.descripcion, p.precio, p.url_img, p.categoria_id, p.usuario_id as vendedor_id, u.nombre as vendedor_nombre
      FROM favoritos f 
      JOIN productos p ON f.producto_id = p.id 
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE f.usuario_id = $1
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  },

  remove: async ({ usuario_id, producto_id }) => {
    const query = `
      DELETE FROM favoritos WHERE usuario_id = $1 AND producto_id = $2 RETURNING *
    `;
    const values = [usuario_id, producto_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = Favorite;
