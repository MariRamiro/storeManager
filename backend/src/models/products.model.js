const camelize = require('camelize');
const connection = require('../db/connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id;',
  );
  return camelize(products);
};

const getByIdProduct = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;', 
    [id],
  );
  return camelize(product);
};

const insertProduct = async (productName) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO products (name) VALUES (?);', [productName]);
  return insertId;
};

const updateProduct = async (id, productName) => {
  await connection
    .execute('UPDATE products SET name = ? WHERE id = ?;', [id, productName]);
  return {
    id: Number(id),
    name: productName,
  };
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM products WHERE id = ?;', [id]);
  return affectedRows;
};

const getProducts = async (q) => {
  const [products] = await connection
    .execute('SELECT * FROM products WHERE name LIKE ?', [`%${q}%`]);

  return products;
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};