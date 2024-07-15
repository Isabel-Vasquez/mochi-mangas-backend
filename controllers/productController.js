const Product = require('../models/Product');

const createProduct = async (req, res) => {
  const { titulo, descripcion, precio, url_img, categoria_id, usuario_id } =
    req.body;
  try {
    const newProduct = await Product.create({
      titulo,
      descripcion,
      precio,
      url_img,
      categoria_id,
      usuario_id,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al añadir el producto:', error);
    res.status(500).json({ error: 'Error al añadir el producto' });
  }
};

const getAllProducts = async (req, res) => {
  const { categoryId } = req.query;
  try {
    let products;
    if (categoryId) {
      products = await Product.findByCategory(categoryId);
    } else {
      products = await Product.findAll();
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.delete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
