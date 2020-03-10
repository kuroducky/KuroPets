const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "172.21.148.170",
  database: "kuropets_db",
  password: "Kuroducky",
  port: 5432
});

module.exports = pool;
