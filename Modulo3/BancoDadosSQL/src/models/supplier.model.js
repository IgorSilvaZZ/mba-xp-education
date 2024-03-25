import { INTEGER, STRING } from "sequelize";

import { sequelizeConnect } from "../database/connection.js";

const Supplier = new sequelizeConnect.define(
  "Suppliers",
  {
    supplierId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    cnpj: {
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

export { Supplier };
