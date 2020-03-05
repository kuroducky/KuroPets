const pool = require('./connect')

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "tbl_Account"', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM "tbl_Account" WHERE "accountID" = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
  });
}

const createUser = (request, response) => {
    const { accountName, accountPassword, accountPhone } = request.body;

    pool.query('INSERT INTO "tbl_Account" ("accountName", "accountPassword", "accountPhone") VALUES ($1, $2, $3) RETURNING *', [name, password, phone], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User added with ID: ${result.rows[0].accountID}`);
    });
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { accountName, accountPassword, accountPhone } = request.body;

    pool.query(
        'UPDATE "tbl_Account" SET "accountName" = $1, "accountPassword" = $2, "accountPhone" = $3 WHERE "accountID" = $4 RETURNING *',
        [accountName, accountPassword, accountPhone, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM "tbl_Account" WHERE "accountID" = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
