const pool = require('../config/database');

const Payment = {
  create: async ({
    usuario_id,
    carrito_id,
    metodo_pago,
    direccion_envio,
    tipo_envio,
    pais,
    comuna,
    region,
  }) => {
    const query = `
      INSERT INTO pagos (usuario_id, carrito_id, metodo_pago, fecha_pago, direccion_envio, tipo_envio, pais, comuna, region)
      VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8)
      RETURNING id, usuario_id, carrito_id, metodo_pago, fecha_pago, direccion_envio, tipo_envio, pais, comuna, region
    `;
    const values = [
      usuario_id,
      carrito_id,
      metodo_pago,
      direccion_envio,
      tipo_envio,
      pais,
      comuna,
      region,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findByUserId: async (usuario_id) => {
    const query = `
      SELECT p.*, ci.producto_id, ci.cantidad, pr.titulo, pr.url_img, pr.precio
      FROM pagos p
      JOIN carrito_items ci ON p.carrito_id = ci.carrito_id
      JOIN productos pr ON ci.producto_id = pr.id
      WHERE p.usuario_id = $1
      ORDER BY p.fecha_pago DESC
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  },
};

module.exports = Payment;
