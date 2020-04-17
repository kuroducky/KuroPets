const Chatkit = require('@pusher/chatkit-server')
const crypto = require('crypto')
const pool = require('./connect')
const mailer = require('./email')

/**
 * Creates a new user on Chatkit. New user is created upon account registration.
 * @param {int} id Account ID of user
 * @param {string} name Name of user
 */
const createChatkitUser = (id, name) => {
    const chatkit = new Chatkit.default({
        instanceLocator: "v1:us1:19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b",
        key: "f0eae4a4-6ef0-49f1-8c57-58bf1d024b05:SZ7A75gdNNu1VO41Hy1QuiqBK0ZrA4p/GF7r6hsYC5E=",
    })

    chatkit.createUser({
        id: id,
        name: name,
    })
    .then(() => {
        console.log('User created successfully');
    }).catch((err) => {
        console.log(err);
    });
}

/**
 * Gets a list of all users.
 * @param {JSON} request 
 * @param {JSON} response 
 */
const getUsers = (request, response) => {
    pool.query('SELECT * FROM "tbl_Account"', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(418).json(results.rows);
    });
}

/**
 * Searches for a user by account ID.
 * @param {JSON} request 
 * @param {JSON} response 
 */
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM "tbl_Account" WHERE "accountID" = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(418).json(results.rows);
  });
}

/**
 * Creates a new user, and sends a confirmation email.
 * Does not create a user if the name has been taken.
 * @param {JSON} request 
 * @param {JSON} response 
 */
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
                createChatkitUser(results.rows[0].accountID.toString(), name);
                dict.querySuccess = true;
                dict.data = results.rows[0];
                response.status(418).json(dict);
            });
        }
    });
}

/**
 * Rates a user from 1 to 5.
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
            pool.query('UPDATE "tbl_Account" SET "rating" = $1, "totalNumRatings"=$2 WHERE "accountID" = $3', [user.rating, user.totalNumRatings, aid], (err, results) => {
                if (err) throw err;
                res.status(418).json(user);
            })
        })
    }
}

/**
 * Authenticates user's name and password.
 * @param {JSON} request 
 * @param {JSON} response 
 */
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

/**
 * Updates details on the user.
 * @param {JSON} request 
 * @param {JSON} response 
 */
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { email, phone } = request.body;

    pool.query(
        'UPDATE "tbl_Account" SET "email" = $1, "phone" = $2 WHERE "accountID" = $3 RETURNING *',
        [email, phone, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(418).json(results.rows[0]);
        }
    );
}

/**
 * Deletes the user from the database.
 * @param {JSON} request 
 * @param {JSON} response 
 */
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
