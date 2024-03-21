import { connect } from "../database/connection.js";

export class ClientRepository {
  async getClients() {
    const connection = await connect();

    try {
      const { rows } = await connection.query("SELECT * FROM Clients");

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async getClientById(id) {
    const connection = await connect();

    try {
      const { rows } = await connection.query(
        "SELECT * FROM Clients WHERE clientId = $1",
        [id]
      );

      const [client] = rows;

      return client;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async create({ name, cpf, phone, email, address }) {
    const connection = await connect();

    try {
      const sql =
        "INSERT INTO Clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";

      const values = [name, cpf, phone, email, address];

      const result = await connection.query(sql, values);

      const [client] = result.rows;

      return client;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async updateClientById(id, { name, cpf, phone, email, address }) {
    const connection = await connect();

    try {
      const sql =
        "UPDATE Clients SET name = $1, cpf = $2, phone = $3, email = $4, address = $5 WHERE clientId = $6 RETURNING *";

      const values = [name, cpf, phone, email, address, id];

      const { rows } = await connection.query(sql, values);

      const [client] = rows;

      return client;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async deleteClientById(id) {
    const connection = await connect();

    try {
      await connection.query("DELETE FROM Clients WHERE clientId = $1", [id]);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }
}
