import { INTEGER, STRING } from "sequelize";

import { sequelizeConnect } from "../database/connection.js";

const Client = sequelizeConnect.define(
  "clients",
  {
    clientid: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    cpf: {
      type: STRING,
      allowNull: false,
    },
    phone: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    address: {
      type: STRING,
      allowNull: false,
    },
  },
  { underscored: false }
);

export { Client };
