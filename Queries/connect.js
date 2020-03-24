const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "kuropets_db",
  password: "Kuroducky",
  port: 5432,
  connectionTimeoutMillis: 2000,
  query_timeout: 1000
});

module.exports = pool;
