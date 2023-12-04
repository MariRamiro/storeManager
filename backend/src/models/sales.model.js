const camelize = require('camelize');
const connection = require('../db/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity 
      FROM sales s
      RIGHT JOIN sales_products sp
      ON s.id = sp.sale_id
      ORDER BY sale_id, product_id;`, 
  );

  return camelize(sales);
};

const getByIdSale = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity
      FROM sales s
      RIGHT JOIN sales_products sp
      ON s.id = sp.sale_id
      WHERE sale_id = ?
      ORDER BY sale_id, product_id;`,
    [id],
  );
  return camelize(sale);
};

const insertSale = async (data) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales (date) VALUES (NOW())');
  const insert = data.map(({ productId, quantity }) => connection
    .execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
      [insertId, productId, quantity],
    ));
  await Promise.all(insert);
  return insertId;
};

module.exports = {
  getAllSales,
  getByIdSale,
  insertSale,
};