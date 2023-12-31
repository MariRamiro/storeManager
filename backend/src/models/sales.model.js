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

const findByIdSale = async (id) => {
  const [[sale]] = await connection
    .execute('SELECT id FROM sales WHERE id = ?', [id]);
  
  return camelize(sale);
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return id;
};

const updateSale = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?', 
    [quantity, saleId, productId],
  );
  
  const updatedSale = {
    date: new Date(),
    productId: Number(productId),
    quantity,
    saleId: Number(saleId),
  };
  
  return updatedSale;
};

const updateProductsSale = async (saleId, productId) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM sales_products WHERE sale_id = ? AND product_id = ?',
    [saleId, productId],
  );

  return camelize(sale);
};

module.exports = {
  getAllSales,
  getByIdSale,
  insertSale,
  findByIdSale,
  deleteSale,
  updateSale,
  updateProductsSale,
};