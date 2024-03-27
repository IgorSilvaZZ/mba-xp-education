import { connect } from "../database/connection.js";

import { Product } from "../models/product.model.js";

export class ProductRepository {
  async getProducts() {
    try {
      const products = await Product.findAll();

      return products;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const { rows } = await connection.query("SELECT * FROM Products");

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async getProductById(id) {
    try {
      const product = await Product.findByPk(id);

      return product;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const { rows } = await connection.query(
        "SELECT * FROM Products WHERE productId = $1",
        [id]
      );

      const [product] = rows;

      return product;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async create({ name, description, value, stock, supplierid }) {
    try {
      const product = await Product.create({
        name,
        description,
        value,
        stock,
        supplierid,
      });
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const sql =
        "INSERT INTO Products (name, description, value, stock, supplierId) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const values = [name, description, value, stock, supplierId];

      const { rows } = await connection.query(sql, values);

      const [product] = rows;

      return product;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async updateProductById(id, { name, description, value, stock, supplierId }) {
    try {
      const [, productUpdated] = await Product.update(
        { name, description, value, stock, supplierId },
        {
          where: {
            productid: id,
          },
          returning: true,
        }
      );

      return productUpdated[0];
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const sql =
        "UPDATE Products SET name = $1, description = $2, value = $3, stock = $4, supplierId = $5 WHERE productId = $6 RETURNING *";

      const values = [name, description, value, stock, supplierId, id];

      const { rows } = await connection.query(sql, values);

      const [product] = rows;

      return product;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async deleteProductById(id) {
    try {
      await Product.destroy({
        where: {
          productid: id,
        },
      });
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      await connection.query("DELETE FROM Products WHERE productId = $1", [id]);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }
}
