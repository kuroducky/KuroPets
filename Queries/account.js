const pool = require('./connect')

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "tbl_Account"', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(418).json(results.rows);
    });
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM "tbl_Account" WHERE "accountID" = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(418).json(results.rows);
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
            pool.query('INSERT INTO "tbl_Account" ("name", "password", "phone", "rating", "totalNumRatings") VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, password, phone, 0, 0], (error, results) => {
                if (error) {
                    throw error;
                }
                dict.querySuccess = true;
                dict.data = results.rows[0];
                response.status(418).json(dict);
            });
        }
    });
}

const rateUser = (req, res) => {
    const aid = req.params.id;
    const rating = req.body.rating;

    if (!Number.isInteger(rating) || rating < 1 || rating > 5){
        res.status(400).json(null);
    }
    else {
        pool.query('SELECT * FROM "tbl_Account" WHERE "accountID" = $1', [aid], (err, results) => {
            if (err) throw err;
            const user = results.rows[0];
            user.rating = (user.rating * user.totalNumRatings + rating)/(user.totalNumRatings + 1);
            user.totalNumRatings++;
            pool.query('UPDATE "tbl_Account" SET "rating" = $1, "totalNumRatings"=$2', [user.rating, user.totalNumRatings], (err, results) => {
                if (err) throw err;
                res.status(418).json(user);
            })
        })
    }
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
        response.status(418).json(dict);
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, password, phone, rating, totalNumRatings } = request.body;

    pool.query(
        'UPDATE "tbl_Account" SET "name" = $1, "password" = $2, "phone" = $3, "rating" = $4, "totalNumRatings" = $5 WHERE "accountID" = $6 RETURNING *',
        [name, password, phone, rating, totalNumRatings, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(418).json(results.rows[0]);
        }
    );
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM "tbl_Account" WHERE "accountID" = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(418).send(`User deleted with ID: ${id}`);
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    rateUser,
    authenticateUser,
    updateUser,
    deleteUser
};
