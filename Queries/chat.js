const pool = require('./connect')
const crypto = require('crypto')

/**
 * Gets all the chats in the database.
 * Each chat consists of the id and name of both users, as well as a hashed chat url.
 * @param {JSON} request 
 * @param {JSON} response 
 */
const getAllChats = (request, response) => {
    pool.query('SELECT * FROM "tbl_Chat"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(418).json(results.rows)
    })
}

/**
 * Gets all chats by a certain user.
 * @param {JSON} request 
 * @param {JSON} response 
 */
const getAllUserChats = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM "tbl_Chat" WHERE "id" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).json(results.rows)
    })
}

/**
 * Gets a chat between two specific users.
 * Also creates a new chat, if not previously created.
 * @param {JSON} request 
 * @param {JSON} response 
 */
const getUserChat = (request, response) => {
    const id1 = request.params.id
    const id2 = request.params.otherId
    const { name, otherName } = request.query

    if (id1 == id2){
        res.status(400).json({})
    }

    pool.query('SELECT * FROM "tbl_Chat" WHERE "id" = $1 AND "otherId" = $2',
    [id1, id2],
    (error, results) => {
        if(error){
            throw error
        }
        if (results.rows.length == 0){
            const hash1 = crypto.createHmac('sha256', id1.toString()).update(id2.toString()).digest('hex')
            const hash2 = crypto.createHmac('sha256', id2.toString()).update(id1.toString()).digest('hex')
            pool.query('INSERT INTO "tbl_Chat" ("id", "name", "otherId", "otherName", "url") VALUES ($1, $2, $3, $4, $5), ($3, $4, $1, $2, $6) RETURNING *',
            [id1, name, id2, otherName, hash1, hash2],
            (error, results) => {
                if(error){
                    throw error
                }
                response.status(418).json(results.rows[0])
            })
        }
        else {
            response.status(418).json(results.rows[0])
        }
    })
}

/**
 * Gets the users, based on the chat url.
 * @param {JSON} req 
 * @param {JSON} res 
 */
const getUsers = (req, res) => {
    const url = req.params.url;
    pool.query('SELECT * FROM "tbl_Chat" WHERE "url" = $1', [url], (err, results) => {
        if (err) throw err;
        res.status(418).json(results.rows[0]);
    })
}

module.exports = {
    getAllChats,
    getAllUserChats,
    getUserChat,
    getUsers
};
