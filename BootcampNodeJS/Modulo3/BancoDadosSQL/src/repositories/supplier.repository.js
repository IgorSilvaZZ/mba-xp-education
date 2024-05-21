/* import { connect } from "../database/connection.js"; */

import { Supplier } from "../models/supplier.model.js";

export class SupplierRepository {
  async getSuppliers() {
    try {
      const suppliers = await Supplier.findAll();

      return suppliers;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const { rows } = await connection.query("SELECT * FROM Suppliers");

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async getSupplierById(id) {
    try {
      const supplier = await Supplier.findByPk(id);

      return supplier;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const { rows } = await connection.query(
        "SELECT * FROM Suppliers WHERE supplierId = $1",
        [id]
      );

      const [supplier] = rows;

      return supplier;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async create({ name, cnpj, phone, email, address }) {
    try {
      const supplier = await Supplier.create({
        name,
        cnpj,
        phone,
        email,
        address,
      });

      return supplier;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const sql =
        "INSERT INTO Suppliers (name, cnpj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";

      const values = [name, cnpj, phone, email, address];

      const result = await connection.query(sql, values);

      const [supplier] = result.rows;

      return supplier;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async updateSupplierById(id, { name, cnpj, phone, email, address }) {
    try {
      const [, supplierUpdated] = await Supplier.update(
        { name, cnpj, phone, email, address },
        {
          where: {
            supplierid: id,
          },
          returning: true,
        }
      );

      return supplierUpdated[0];
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      const sql =
        "UPDATE Suppliers SET name = $1, cnpj = $2, phone = $3, email = $4, address = $5 WHERE supplierId = $6 RETURNING *";

      const values = [name, cnpj, phone, email, address, id];

      const { rows } = await connection.query(sql, values);

      const [supplier] = rows;

      return supplier;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async deleteSupplierById(id) {
    try {
      await Supplier.destroy({
        where: {
          supplierid: id,
        },
      });
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      await connection.query("DELETE FROM Suppliers WHERE supplierId = $1", [
        id,
      ]);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }
}
