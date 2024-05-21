/* import { connect } from "../database/connection.js"; */
import { Client } from "../models/client.model.js";

export class ClientRepository {
  async getClients() {
    /* const connection = await connect(); */

    try {
      const clients = await Client.findAll();

      return clients;
    } catch (error) {
      throw error;
    }

    /* try {
      const { rows } = await connection.query("SELECT * FROM Clients");

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }

  async getClientById(id) {
    try {
      const client = await Client.findByPk(id);

      return client;
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

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
    } */
  }

  async create({ name, cpf, phone, email, address }) {
    try {
      const client = Client.create({
        name,
        cpf,
        phone,
        email,
        address,
      });

      return client;
    } catch (error) {
      throw error;
    }

    /* try {
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
    } */
  }

  async updateClientById(id, { name, cpf, phone, email, address }) {
    try {
      const [, clientUpdate] = await Client.update(
        { name, cpf, phone, email, address },
        {
          where: {
            clientid: id,
          },
          returning: true,
        }
      );

      return clientUpdate[0];
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

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
    } */
  }

  async deleteClientById(id) {
    try {
      await Client.destroy({
        where: {
          clientid: id,
        },
      });
    } catch (error) {
      throw error;
    }

    /* const connection = await connect();

    try {
      await connection.query("DELETE FROM Clients WHERE clientId = $1", [id]);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    } */
  }
}
