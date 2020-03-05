const express = require('express')
const bodyParser = require('body-parser')
const requireDir = require('require-dir')
const db = requireDir('./Queries')

const app = express()
const port = 3000
<<<<<<< HEAD
const db = require('./queries')
=======
>>>>>>> d14399a43c973e046aad13ea97bb88d02b804364

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
  })

// Account endpoints
app.get('/api/user', db.account.getUsers)
app.get('/api/user/:id', db.account.getUserById)
app.post('/api/user', db.account.createUser)
app.put('/api/user/:id', db.account.updateUser)
app.delete('/api/user/:id', db.account.deleteUser)

// Search Endpoints
app.get('/api/search/post', db.search.searchPost)
app.get('/api/search/user', db.search.searchUser)

<<<<<<< HEAD
app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
app.post('/users/create', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
app.get('/users/tables', db.getTables)
=======
// Location endpoints
app.get('/api/location/vet', db.location.getVets)
app.get('/api/location/park', db.location.getParks)
>>>>>>> d14399a43c973e046aad13ea97bb88d02b804364

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
