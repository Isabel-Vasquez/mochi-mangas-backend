const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { nombre, apellido, email, password, rut, direccion, telefono } =
    req.body;
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'El correo electrónico ya está registrado' });
    }

    const newUser = await User.create({
      nombre,
      apellido,
      email,
      password,
      rut,
      direccion,
      telefono,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        res.json({
          token,
          user: {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            rut: user.rut,
            direccion: user.direccion,
            telefono: user.telefono,
          },
        });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.user;
  const updatedFields = req.body;
  try {
    const updatedUser = await User.update(userId, updatedFields);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser, getAllUsers, updateUser };
