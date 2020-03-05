<<<<<<< HEAD
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kuropets_db',
  password: 'Kuroducky',
  port: 5432,
})

const getTables = (request, response) => {
  pool.query('SELECT * FROM information_schema.tables', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getUsers = (request, response) => {
  pool.query('SELECT * FROM "tbl_Account"', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const createUser = (request, response) => {
  const {accountID, accountName, accountPassword, accountPhone } = request.body

  console.log(accountID);
  console.log(accountName);
  console.log(accountPassword);
  console.log(accountPhone);
  pool.query('INSERT INTO "tbl_Account" ("accountID", "accountName", "accountPassword", "accountPhone") VALUES ($1, $2, $3, $4)', [accountID, accountName, accountPassword, accountPhone], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`${results.accountName} added with ID: ${results.accountID}`);
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getTables
}
=======
const Pool = require('pg').Pool;
module.exports = new Pool({
  user: 'postgres',
  host: '172.21.148.170',
  database: 'kuropets_db',
  password: 'Kuroducky',
  port: 5432,
});
>>>>>>> d14399a43c973e046aad13ea97bb88d02b804364
