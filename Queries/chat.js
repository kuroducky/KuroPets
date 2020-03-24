const pool = require('./connect')

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
    pool.query('SELECT * FROM "tbl_Chat" WHERE "id" = $1 OR "otherId" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).json(results.rows)
    })
}

// const getUserChat = (request, response) => {
//     const id1 = parseInt(request.params.accID1)
//     const id2 = parseInt(request.params.accID2)
//     pool.query('SELECT * FROM "tbl_Chat" WHERE ("sendeeID" = $1 AND "senderID" = $2) OR ("sendeeID" = $2 AND "senderID" = $1)',
//     [id1, id2],
//     (error, results) => {
//         if(error){
//             throw error
//         }
//         response.status(418).json(results.rows)
//     })
// }

const createChat = (request, response) => {
    const { id, name, otherId, otherName } = request.body
    pool.query('INSERT INTO "tbl_Chat" ("id", "name", "otherId", "otherName", "msgCount") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, name, otherId, otherName, 0],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).json(results.rows[0])
    })
}

module.exports = {
    getAllChats,
    getAllUserChats,
    // getUserChat,
    createChat
};
