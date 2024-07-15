const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

const createCart = async (req, res) => {
  const { userId } = req.user;
  try {
    const newCart = await Cart.create(userId);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartByUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const cart = await Cart.findByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    const items = await CartItem.findByCartId(cart.id);
    res.json({ cart, items });
  } catch (error) {
    console.error('Error obteniendo el carrito:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCart,
  getCartByUser,
};
