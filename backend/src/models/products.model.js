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

const createProduct = async (data) => {
  const [insert] = await connection.execute(
    `INSERT INTO products (name)
      VALUES (?);`,
    [data.name],
  );
  return (insert);
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  createProduct,
};