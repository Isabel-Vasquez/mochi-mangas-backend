const pool = require('../config/database');
const bcrypt = require('bcrypt');

const User = {
  create: async ({
    nombre,
    apellido,
    email,
    password,
    direccion,
    telefono,
    rut,
  }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO usuarios (nombre, apellido, email, password, direccion, telefono, rut, fecha_registro)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING id, nombre, apellido, email, direccion, telefono, rut, fecha_registro
    `;
    const values = [
      nombre,
      apellido,
      email,
      hashedPassword,
      direccion,
      telefono,
      rut,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  findById: async (id) => {
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  update: async (id, updatedFields) => {
    const fields = Object.keys(updatedFields).map(
      (field, index) => `${field} = $${index + 2}`
    );
    const values = Object.values(updatedFields);
    const query = `
      UPDATE usuarios
      SET ${fields.join(', ')}
      WHERE id = $1
      RETURNING id, nombre, apellido, email, direccion, telefono, rut, fecha_registro
    `;
    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  },
};

module.exports = User;
