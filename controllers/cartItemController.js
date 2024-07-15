const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const pool = require('../config/database');

const addItemToCart = async (req, res) => {
  const { userId } = req.user;
  const { producto_id, cantidad } = req.body;

  try {
    let cart = await Cart.findByUserId(userId);
    if (!cart) {
      cart = await Cart.create(userId);
    }

    const productResult = await pool.query(
      'SELECT precio FROM productos WHERE id = $1',
      [producto_id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const precio = productResult.rows[0].precio;

    const existingItem = await pool.query(
      'SELECT * FROM carrito_items WHERE carrito_id = $1 AND producto_id = $2',
      [cart.id, producto_id]
    );

    if (existingItem.rows.length > 0) {
      const updatedItem = await CartItem.updateQuantity({
        carrito_id: cart.id,
        producto_id,
        cantidad: existingItem.rows[0].cantidad + cantidad,
      });
      res.status(200).json(updatedItem);
    } else {
      const newItem = await CartItem.add({
        carrito_id: cart.id,
        producto_id,
        cantidad,
        precio,
      });
      res.status(201).json(newItem);
    }
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  const { userId } = req.user;
  const { producto_id } = req.params;

  try {
    const cart = await Cart.findByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const deletedItem = await CartItem.remove({
      carrito_id: cart.id,
      producto_id,
    });
    if (!deletedItem) {
      return res
        .status(404)
        .json({ error: 'Producto no encontrado en el carrito' });
    }

    res.json(deletedItem);
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateItemQuantity = async (req, res) => {
  const { userId } = req.user;
  const { producto_id, cantidad } = req.body;

  try {
    const cart = await Cart.findByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedItem = await CartItem.updateQuantity({
      carrito_id: cart.id,
      producto_id,
      cantidad,
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
};
