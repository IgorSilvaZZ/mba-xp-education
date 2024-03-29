import { DOUBLE, INTEGER, DATE } from "sequelize";

import { sequelizeConnect } from "../database/connection.js";

import { Client } from "./client.model.js";
import { Product } from "./product.model.js";

const Sale = sequelizeConnect.define(
  "sales",
  {
    saleid: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    value: {
      type: DOUBLE,
      allowNull: false,
    },
    data: {
      type: DATE,
      allowNull: false,
    },
  },
  { underscored: false }
);

Sale.belongsTo(Client, { foreignKey: "clientid" });
Sale.belongsTo(Product, { foreignKey: "productid" });

export { Sale };
