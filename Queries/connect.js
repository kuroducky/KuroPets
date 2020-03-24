// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "kuropets_db",
//   password: "Kuroducky",
//   port: 5432,
//   // connectionTimeoutMillis: 2000,
//   query_timeout: 1000
// });
const promise = require('bluebird');
const initOptions = {
  promiseLib: promise
};


const pgp = require('pg-promise')(initOptions);

const cn = 
{
  host: 'localhost',
  port: '5432',
  database: 'kuropets_db',
  user: 'postgres',
  password: "Kuroducky"
};

const pool = pgp(cn);


module.exports = pool;
