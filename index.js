const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const requireDir = require("require-dir");
const db = requireDir("./queries");

const app = express();
const port = 5000;

app.options('*', cors())

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credential", true);
  next();
});

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

// Account endpoints
app.get("/api/user", db.account.getUsers);
app.get("/api/user/:id", db.account.getUserById);
app.post("/api/user", db.account.createUser);
app.post("/api/user/:id/rate", db.account.rateUser);
app.post("/api/user/authenticate", db.account.authenticateUser);
app.put("/api/user/:id", db.account.updateUser);
app.delete("/api/user/:id", db.account.deleteUser);

// Post endpoints
app.get("/api/post", db.post.getPost);
app.get("/api/post/:pid", db.post.getOnePost);
app.get("/api/user/:aid/post", db.post.getOneAccountPost);
app.post("/api/post/", db.post.createPost);
app.post("/api/post/:pid/complete", db.post.completePost);
app.put("/api/post/:pid", db.post.updatePost);
app.delete("/api/post/:pid", db.post.deletePost);

// Offer endpoints
app.get("/api/offer", db.offer.getAllOffers);
app.get("/api/offer/:oid", db.offer.getOffer);
app.get("/api/post/:pid/offer", db.offer.getAllPostOffers);
app.get("/api/user/:id/offer", db.offer.getAllUserOffers);
app.post("/api/offer", db.offer.createOffer);
app.put("/api/offer/:oid", db.offer.updateOffer);
app.delete("/api/offer/:oid", db.offer.deleteOffer);

// Chat endpoints
app.get("/api/chat", db.chat.getAllChats);
app.get("/api/chat/:url/user", db.chat.getUsers);
app.get("/api/chat/:id", db.chat.getAllUserChats);
app.get("/api/chat/:id/:otherId", db.chat.getUserChat);

// Location endpoints
app.get("/api/location/vet", db.location.getVets);
app.get("/api/location/park", db.location.getParks);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
