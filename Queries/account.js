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
    const { name, password, phone } = request.body;
    var dict = {};

    pool.query('SELECT * FROM "tbl_Account" WHERE "name" = $1', [name], (error, results) => {
        if (error) {
          throw error;
        }
        
        if (results.rows[0] !== undefined){
            dict.querySuccess = false;
            response.status(400).json(dict);
        }
        else {
            pool.query('INSERT INTO "tbl_Account" ("name", "password", "phone") VALUES ($1, $2, $3) RETURNING *', [name, password, phone], (error, results) => {
                if (error) {
                    throw error;
                }
                dict.querySuccess = true;
                dict.data = results.rows[0];
                response.status(200).json(dict);
            });
        }
    });
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, password, phone } = request.body;

    pool.query(
        'UPDATE "tbl_Account" SET "name" = $1, "password" = $2, "phone" = $3 WHERE "accountID" = $4 RETURNING *',
        [name, password, phone, id],
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

const authenticateUser = (request, response) => {
    const { name, password } = request.body;

    pool.query('SELECT * FROM "tbl_Account" WHERE "name" = $1 AND "password" = $2', [name, password], (error, results) => {
        if (error)
            throw error;
        
        var dict = {};
        if (results.rows[0] === undefined){
            dict.loginSuccess = false;
        }
        else {
            dict.loginSuccess = true
            dict.data = results.rows[0];
        }
        response.status(200).json(dict);
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser
};
