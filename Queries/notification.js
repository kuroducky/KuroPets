
const getAllNotifications = (request, response) => {
    pool.query('SELECT * FROM tbl_Notification', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllUserNotifications = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM tbl_Notification WHERE accountID = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserNotification = (request, response) => {
    const Aid = parseInt(request.params.accID)
    const Nid = parseInt(request.params.notifID)

    pool.query('SELECT * FROM tbl_Notification WHERE accountID = $1 AND notificationID = $2', 
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
    const {type , timestamp} = request.body

    pool.query('INSERT INTO tbl_Notification (notificationType, notificationTimestamp, accountID) VALUES ($1, $2, $3)', 
    [type, timestamp, id], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Notification added with ID: ${result.insertId}`)
    })
}

const deleteAllUserNotifications = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM tbl_Notification WHERE accountID = $1',
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

    pool.query('DELETE FROM tbl_Notification WHERE accountID = $1 AND notificationID = $2',
    [Aid, Nid],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Notification deleted for accountID: ${Aid} and notificationID: ${Nid}`)
    })
}

module.exports = Notification;

// app.get('/notification', db.notification.getAllNotifications)
// app.get('/notification/:id', db.notification.getAllUserNotifications)
// app.get('/notification/:accID/:notifID', db.notification.getUserNotification)
// app.post('/notification/:id', db.notification.createNotification)
// app.delete('/notification/:id', db.notification.deleteAllUserNotifications)
// app.delete('/notification/:accID/:notifID', db.notification.deleteUserNotification)