const express = require('express')
const bodyParser = require('body-parser')
const requireDir = require('require-dir')
const db = requireDir('./Queries')

const app = express()
const port = 3000

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

// Location endpoints
app.get('/api/location/vet', db.location.getVets)
app.get('/api/location/park', db.location.getParks)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
