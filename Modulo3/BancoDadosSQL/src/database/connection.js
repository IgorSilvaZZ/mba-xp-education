import pg from "pg";

export function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString:
      "postgresql://localhost/store?user=postgres&password=docker",
  });

  global.connection = pool;

  return pool.connect();
}
