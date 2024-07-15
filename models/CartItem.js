const pool = require('../config/database');

const CartItem = {
  add: async ({ carrito_id, producto_id, cantidad, precio }) => {
    const query = `
      INSERT INTO carrito_items (carrito_id, producto_id, cantidad, precio)
      VALUES ($1, $2, $3, $4)
      RETURNING id, carrito_id, producto_id, cantidad, precio
    `;
    const values = [carrito_id, producto_id, cantidad, precio];
    const result = await pool.query(query, values);

    const newItem = result.rows[0];

    const productQuery = `
      SELECT p.titulo, p.url_img 
      FROM productos p
      WHERE p.id = $1
    `;
    const productResult = await pool.query(productQuery, [producto_id]);

    return { ...newItem, ...productResult.rows[0] };
  },

  findByCartId: async (carrito_id) => {
    const query = `
      SELECT ci.*, p.titulo, p.url_img 
      FROM carrito_items ci
      JOIN productos p ON ci.producto_id = p.id
      WHERE ci.carrito_id = $1
    `;
    const result = await pool.query(query, [carrito_id]);
    return result.rows;
  },

  remove: async ({ carrito_id, producto_id }) => {
    const query = `
      DELETE FROM carrito_items WHERE carrito_id = $1 AND producto_id = $2 RETURNING *
    `;
    const values = [carrito_id, producto_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  updateQuantity: async ({ carrito_id, producto_id, cantidad }) => {
    const query = `
      UPDATE carrito_items
      SET cantidad = $3
      WHERE carrito_id = $1 AND producto_id = $2
      RETURNING id, carrito_id, producto_id, cantidad, precio
    `;
    const values = [carrito_id, producto_id, cantidad];
    const result = await pool.query(query, values);

    const updatedItem = result.rows[0];

    const productQuery = `
      SELECT p.titulo, p.url_img 
      FROM productos p
      WHERE p.id = $1
    `;
    const productResult = await pool.query(productQuery, [producto_id]);

    return { ...updatedItem, ...productResult.rows[0] };
  },
};

module.exports = CartItem;
