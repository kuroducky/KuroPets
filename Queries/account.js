const pool = require('./connect')
const crypto = require('crypto')
const mailer = require('./email')

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
    const { name, email, password, phone } = request.body;
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
            mailer.sendMail(email, 'Welcome to KuroPets!')
            const hash = crypto.createHmac('sha256', password).update(name).digest('hex')
            pool.query('INSERT INTO "tbl_Account" ("name", "email", "password", "phone", "rating", "totalNumRatings") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, email, hash, phone, 0, 0], (error, results) => {
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

    const hash = crypto.createHmac('sha256', password).update(name).digest('hex')
    pool.query('SELECT * FROM "tbl_Account" WHERE "name" = $1 AND "password" = $2', [name, hash], (error, results) => {
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
    const { name, email, phone } = request.body;

    pool.query(
        'UPDATE "tbl_Account" SET "name" = $1, "email" = $2, "phone" = $3 WHERE "accountID" = $4 RETURNING *',
        [name, email, phone, id],
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
