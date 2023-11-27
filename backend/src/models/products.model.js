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

module.exports = {
  getAllProducts,
  getByIdProduct,
};