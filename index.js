const express = require('express')
const bodyParser = require('body-parser')
const requireDir = require('require-dir')
const pool = require('./queries')
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


app.get('/api/location/vet', db.location.getVets)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
