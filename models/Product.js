const pool = require('../config/database');

const Product = {
  create: async ({
    titulo,
    descripcion,
    precio,
    url_img,
    categoria_id,
    usuario_id,
  }) => {
    const query = `
      INSERT INTO productos (titulo, descripcion, precio, url_img, categoria_id, usuario_id, fecha_publicacion)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id, titulo, descripcion, precio, url_img, categoria_id, usuario_id, fecha_publicacion
    `;
    const values = [
      titulo,
      descripcion,
      precio,
      url_img,
      categoria_id,
      usuario_id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findAll: async () => {
    const query = 'SELECT * FROM productos';
    const result = await pool.query(query);
    return result.rows;
  },

  findByCategory: async (categoryId) => {
    const query = 'SELECT * FROM productos WHERE categoria_id = $1';
    const result = await pool.query(query, [categoryId]);
    return result.rows;
  },

  findById: async (id) => {
    const query = 'SELECT * FROM productos WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const deleteFavoritesQuery =
        'DELETE FROM favoritos WHERE producto_id = $1';
      await client.query(deleteFavoritesQuery, [id]);

      const deleteCartItemsQuery =
        'DELETE FROM carrito_items WHERE producto_id = $1';
      await client.query(deleteCartItemsQuery, [id]);

      const deleteValoracionesQuery =
        'DELETE FROM valoraciones WHERE producto_id = $1';
      await client.query(deleteValoracionesQuery, [id]);

      const deleteProductQuery =
        'DELETE FROM productos WHERE id = $1 RETURNING *';
      const result = await client.query(deleteProductQuery, [id]);

      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = Product;
