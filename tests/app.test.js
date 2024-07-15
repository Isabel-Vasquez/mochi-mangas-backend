const request = require('supertest');
const app = require('../app');
const pool = require('../config/database');

describe('User Registration and Authentication', () => {
  let token;
  let userId;
  let productId;

  // nunca limpiar la base de datos en producción, solo en base de datos de pruebas.
  beforeAll(async () => {
    await pool.query('DELETE FROM carrito_items');
    await pool.query('DELETE FROM pagos');
    await pool.query('DELETE FROM carrito');
    await pool.query('DELETE FROM favoritos');
    await pool.query('DELETE FROM valoraciones');
    await pool.query('DELETE FROM productos');
    await pool.query('DELETE FROM usuarios');
  });

  afterAll(async () => {
    await pool.end();
  });

  it('Debe registrar un nuevo usuario', async () => {
    const uniqueEmail = `nuevouser4@example.com`;
    const res = await request(app).post('/api/users/register').send({
      nombre: 'Test',
      apellido: 'User',
      email: uniqueEmail,
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('Debe iniciar sesión con credenciales válidas', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'nuevouser4@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('Debe obtener todas las categorías', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Debe crear un producto', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Producto de prueba',
        descripcion: 'Descripción del producto de prueba',
        precio: 100,
        url_img: 'http://example.com/image.jpg',
        categoria_id: 1,
        usuario_id: userId,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    productId = res.body.id;
  });

  it('Debe añadir un artículo al carrito', async () => {
    const res = await request(app)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        producto_id: productId,
        cantidad: 5,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
