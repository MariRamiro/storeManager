// const camelize = require('camelize');
const connection = require('../db/connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id;',
  );
  return (products);
};

const getByIdProduct = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;', 
    [id],
  );
  return (product);
};

const insertProduct = async (data) => {
  const [insert] = await connection.execute(
    `INSERT INTO products (name)
      VALUES (?);`,
    [data.name],
  );
  return (insert);
};

const updateProduct = async (name, id) => {
  const [{ affectedRows }] = await connection
    .execute('UPDATE products SET name = ? WHERE id = ?;', [name, id]);
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM products WHERE id = ?;', [id]);
  return affectedRows;
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};