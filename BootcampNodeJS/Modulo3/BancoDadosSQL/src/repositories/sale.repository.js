import { connect } from "../database/connection.js";

import { Sale } from "../models/sale.model.js";
import { Product } from "../models/product.model.js";
import { Client } from "../models/client.model.js";

export class SaleRepository {
  async getSales() {
    try {
      const sales = await Sale.findAll({
        include: [{ model: Product }, { model: Client }],
      });

      return sales;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const { rows } = await connection.query("SELECT * FROM Sales");

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async getSaleById(id) {
    try {
      const sale = await Sale.findByPk(id, {
        include: [{ model: Product }, { model: Client }],
      });

      return sale;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

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
    } */
  }

  async getSalesByProductId(productid) {
    try {
      const saleByProduct = await Sale.findAll({
        where: {
          productid,
        },
      });

      return saleByProduct;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

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
    } */
  }

  async getSalesBySupplierId(supplierid) {
    try {
      const sales = await Sale.findAll({
        include: [
          {
            model: Product,
            where: {
              supplierid,
            },
          },
        ],
      });

      return sales;
    } catch (error) {
      throw error;
    }
  }

  async create({ value, data, clientid, productid }) {
    try {
      const sale = await Sale.create({
        value,
        data,
        clientid,
        productid,
      });

      return sale;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

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
    } */
  }

  async updateSaleById(id, { value, date, clientid }) {
    try {
      const [, saleUpdated] = await Sale.update(
        { value, date, clientid },
        {
          where: {
            saleid: id,
          },
          returning: true,
        }
      );

      return saleUpdated[0];
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

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
    } */
  }

  async deleteSaleById(id) {
    try {
      await Sale.destroy({
        where: {
          saleid: id,
        },
      });
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      await connection.query("DELETE FROM Sales WHERE saleId = $1", [id]);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }
}
