const pool = require('./connect')

const getAllChats = (request, response) => {
    pool.query('SELECT * FROM "tbl_Chat"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllUserChats = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM "tbl_Chat" WHERE "sendeeID" = $1 OR "senderID" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserChat = (request, response) => {
    const id1 = parseInt(request.params.accID1)
    const id2 = parseInt(request.params.accID2)
    pool.query('SELECT * FROM "tbl_Chat" WHERE ("sendeeID" = $1 AND "senderID" = $2) OR ("sendeeID" = $2 AND "senderID" = $1)',
    [id1, id2],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createChat = (request, response) => {
    const id1 = parseInt(request.params.accID1)
    const id2 = parseInt(request.params.accID2)
    pool.query('INSERT INTO "tbl_Chat" ("sendeeID", "senderID", "messages", "timestamp") VALUES ($1, $2, $3, current_timestamp) RETURNING *',
    [id1, id2, `{${request.body.messages}}`],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getAllChats,
    getAllUserChats,
    getUserChat,
    createChat
};
