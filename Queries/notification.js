const pool = require('./connect')

const getAllNotifications = (request, response) => {
    pool.query('SELECT * FROM "tbl_Notification"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(418).json(results.rows)
    })
}

const getAllUserNotifications = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('UPDATE "tbl_Notification" SET "seen" = true WHERE "accountID" = $1 AND "seen" = false RETURNING *', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(418).json(results.rows)
    })
}

const getNotification = (request, response) => {
    const Nid = parseInt(request.params.notifID)

    pool.query('SELECT * FROM "tbl_Notification" WHERE "notificationID" = $1', 
    [Nid], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(418).json(results.rows)
    })
}

const createNotification = (request, response) => {
    const { accountID, type } = request.body

    pool.query('INSERT INTO "tbl_Notification" ("type", "timestamp", "accountID", "seen") VALUES ($1, current_timestamp, $2, false) RETURNING *', 
    [type, accountID], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(418).json(results.rows[0]);
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
        response.status(418).send(`Notifications deleted for ID: ${id}`)
    })
}

const deleteNotification = (request, response) => {
    const Nid = parseInt(request.params.notifID)

    pool.query('DELETE FROM "tbl_Notification" WHERE "notificationID" = $1',
    [Nid],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).send(`Notification deleted for notificationID: ${Nid}`)
    })
}

module.exports = {
    getAllNotifications,
    getAllUserNotifications,
    getNotification,
    createNotification,
    deleteAllUserNotifications,
    deleteNotification
};
