import { DOUBLE, INTEGER, STRING } from "sequelize";

import { sequelizeConnect } from "../database/connection.js";

import { Supplier } from "./supplier.model.js";

const Product = sequelizeConnect.define(
  "products",
  {
    productid: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
      allowNull: false,
    },
    value: {
      type: DOUBLE,
      allowNull: false,
    },
    stock: {
      type: INTEGER,
      allowNull: false,
    },
  },
  { underscored: false }
);

Product.belongsTo(Supplier, {
  foreignKey: "supplierid",
});

export { Product };
