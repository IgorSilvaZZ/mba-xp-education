import { connect } from "../database/connection.js";

export class ProductRepository {
  async getProducts() {
    const connection = await connect();

    try {
      const { rows } = await connection.query("SELECT * FROM Products");

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async getProductById(id) {
    const connection = await connect();

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
    }
  }

  async create({ name, description, value, stock, supplierId }) {
    const connection = await connect();

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
    }
  }

  async updateProductById(id, { name, description, value, stock, supplierId }) {
    const connection = await connect();

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
    }
  }

  async deleteProductById(id) {
    const connection = await connect();

    try {
      await connection.query("DELETE FROM Products WHERE productId = $1", [id]);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }
}
