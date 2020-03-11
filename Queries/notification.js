const pool = require('./connect')

const getAllNotifications = (request, response) => {
    pool.query('SELECT * FROM "tbl_Notification"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllUserNotifications = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "tbl_Notification" WHERE "accountID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserNotification = (request, response) => {
    const Aid = parseInt(request.params.accID)
    const Nid = parseInt(request.params.notifID)

    pool.query('SELECT * FROM "tbl_Notification" WHERE "accountID" = $1 AND "notificationID" = $2', 
    [Aid, Nid], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createNotification = (request, response) => {
    const id = parseInt(request.params.id)
    const { type } = request.body

    pool.query('INSERT INTO "tbl_Notification" ("type", "timestamp", "accountID") VALUES ($1, current_timestamp, $2) RETURNING *', 
    [type, id], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Notification added with ID: ${results.rows[0].notificationID}`)
    })
}

const deleteAllUserNotifications = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "tbl_Notification" WHERE "accountID" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Notifications deleted for ID: ${id}`)
    })
}

const deleteUserNotification = (request, response) => {
    const Aid = parseInt(request.params.accID)
    const Nid = parseInt(request.params.notifID)

    pool.query('DELETE FROM "tbl_Notification" WHERE "accountID" = $1 AND "notificationID" = $2',
    [Aid, Nid],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Notification deleted for accountID: ${Aid} and notificationID: ${Nid}`)
    })
}

module.exports = {
    getAllNotifications,
    getAllUserNotifications,
    getUserNotification,
    createNotification,
    deleteAllUserNotifications,
    deleteUserNotification
};
