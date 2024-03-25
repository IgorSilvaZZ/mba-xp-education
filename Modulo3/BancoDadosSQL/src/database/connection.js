import pg from "pg";
import { Sequelize } from "sequelize";

export function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString:
      "postgresql://localhost/store?user=docker&password=docker",
  });

  global.connection = pool;

  return pool.connect();
}

export const sequelizeConnect = new Sequelize(
  "postgresql://postgres:docker@localhost:5432/petshop?schema=public",
  {
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);
