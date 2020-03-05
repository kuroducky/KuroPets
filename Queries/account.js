class Account {
    const getUsers = (request, response) => {
      pool.query('SELECT * FROM tbl_account', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }

    const getUsers = (request, response) => {
      pool.query('SELECT * FROM tbl_account', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }

    const getUsers = (request, response) => {
      pool.query('SELECT * FROM tbl_account', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }

    const getUsers = (request, response) => {
      pool.query('SELECT * FROM tbl_account', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }
}

module.exports = Account;
