import { connect } from "../database/connection.js";

export class SaleRepository {
  async getSales() {
    const connection = await connect();

    try {
      const { rows } = await connection.query("SELECT * FROM Sales");

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async getSaleById(id) {
    const connection = await connect();

    try {
      const { rows } = await connection.query(
        "SELECT * FROM Sales WHERE saleId = $1",
        [id]
      );

      const [sale] = rows;

      return sale;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async getSalesByProductId(productId) {
    const connection = await connect();

    try {
      const { rows } = await connection.query(
        "SELECT * FROM Sales WHERE productId = $1",
        [productId]
      );

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async create({ value, date, clientId, productId }) {
    const connection = await connect();

    try {
      const sql =
        "INSERT INTO Sales (value, date, clientId, productId) VALUES ($1, $2, $3, $4) RETURNING *";

      const values = [value, date, clientId, productId];

      const result = await connection.query(sql, values);

      const [sale] = result.rows;

      return sale;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async updateSaleById(id, { value, date, clientId }) {
    const connection = await connect();

    try {
      const sql =
        "UPDATE Sales SET value = $1, date = $2, clientId = $3 WHERE saleId = $6 RETURNING *";

      const values = [value, date, clientId, id];

      const { rows } = await connection.query(sql, values);

      const [sale] = rows;

      return sale;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async deleteSaleById(id) {
    const connection = await connect();

    try {
      await connection.query("DELETE FROM Sales WHERE saleId = $1", [id]);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }
}
