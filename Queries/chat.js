const pool = require('./connect')
const crypto = require('crypto')

const getAllChats = (request, response) => {
    pool.query('SELECT * FROM "tbl_Chat"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(418).json(results.rows)
    })
}

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

const getUserChat = (request, response) => {
    const id1 = request.params.id
    const id2 = request.params.otherId
    const { name, otherName } = request.query

    pool.query('SELECT * FROM "tbl_Chat" WHERE "id" = $1 AND "otherId" = $2',
    [id1, id2],
    (error, results) => {
        if(error){
            throw error
        }
        if (results.rows.length == 0){
            const hash1 = crypto.createHmac('sha256', id1.toString()).update(id2.toString()).digest('hex')
            const hash2 = crypto.createHmac('sha256', id2.toString()).update(id1.toString()).digest('hex')
            pool.query('INSERT INTO "tbl_Chat" ("id", "name", "otherId", "otherName", "msgCount", "url") VALUES ($1, $2, $3, $4, $5, $6), ($3, $4, $1, $2, $5, $7) RETURNING *',
            [id1, name, id2, otherName, 0, hash1, hash2],
            (error, results) => {
                if(error){
                    throw error
                }
                console.log(results.rows[0])
                response.status(418).json(results.rows[0])
            })
        }
        else {
            response.status(418).json(results.rows[0])
        }
    })
}

const getUsers = (req, res) => {
    const url = req.params.url;

    pool.query('SELECT * FROM "tbl_Chat" WHERE "url" = $1', [url], (err, results) => {
        if (err) throw err;
        res.status(418).json(results.rows[0]);
    })
}

// const createChat = (request, response) => {
//     const { id, name, otherId, otherName } = request.body
//     pool.query('INSERT INTO "tbl_Chat" ("id", "name", "otherId", "otherName", "msgCount", url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//     [id, name, otherId, otherName, 0],
//     (error, results) => {
//         if(error){
//             throw error
//         }
//         response.status(418).json(results.rows[0])
//     })
// }

module.exports = {
    getAllChats,
    getAllUserChats,
    getUserChat,
    getUsers
    // createChat
};
