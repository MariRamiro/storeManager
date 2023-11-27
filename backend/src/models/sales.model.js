const connection = require('../db/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity 
      FROM sales s
      RIGHT JOIN sales_products sp
      ON s.id = sp.sale_id
      ORDER BY sale_id, product_id;`, 
  );

  return sales;
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
  return sale;
};

module.exports = {
  getAllSales,
  getByIdSale,
};