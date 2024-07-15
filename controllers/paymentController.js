const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
  const { userId } = req.user;
  const {
    carrito_id,
    metodo_pago,
    direccion_envio,
    tipo_envio,
    pais,
    comuna,
    region,
  } = req.body;

  try {
    const newPayment = await Payment.create({
      usuario_id: userId,
      carrito_id,
      metodo_pago,
      direccion_envio,
      tipo_envio,
      pais,
      comuna,
      region,
    });

    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error creating payment:', error.message);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};

const getUserPurchases = async (req, res) => {
  const { userId } = req.user;

  try {
    const purchases = await Payment.findByUserId(userId);
    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error.message);
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
};

module.exports = {
  createPayment,
  getUserPurchases,
};
