const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const db = requireDir('./Queries');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});

// Account endpoints
app.get('/api/user', db.account.getUsers);
app.get('/api/user/:id', db.account.getUserById);
app.post('/api/user', db.account.createUser);
app.post('/api/user/authenticate', db.account.authenticateUser);
app.put('/api/user/:id', db.account.updateUser);
app.delete('/api/user/:id', db.account.deleteUser);

// Search endpoints
app.get('/api/search/post', db.search.searchPost);
app.get('/api/search/user', db.search.searchUser);

// Post endpoints
app.get('/api/post', db.post.getPost);
app.get('/api/post/:id', db.post.getAllAccountPost);
app.get('/api/post/:id/:pid', db.post.getOneAccountPost);
app.post('/api/post/:id', db.post.createPost);
app.put('/api/post/:id/:pid', db.post.updatePost);
app.delete('/api/post/:id/:pid', db.post.deletePost);

// Image endpoints
app.get('/api/image/:pid', db.image.getImages)
app.get('/api/image/:pid/:imid', db.image.getOneImage)
app.post('/api/image/:pid', db.image.postImage)
app.put('/api/image/:pid/:imid', db.image.updateImage)
app.delete('/api/image/:pid', db.image.deleteAllImages)
app.delete('/api/image/:pid/:imid', db.image.deleteOneImage)

// Offer endpoints
app.get('/api/offer', db.offer.getAllOffers)
app.get('/api/offer/:id', db.offer.getAllPostOffers)
app.get('/api/offer/:pid/:oid', db.offer.getPostOffer)
app.get('/api/user/:id/offer', db.offer.getAllUserOffers)
app.post('/api/offer/:id', db.offer.createOffer)
app.put('/api/offer/:pid/:oid', db.offer.updateOffer)
app.delete('/api/offer/:id', db.offer.deleteAllOffers)
app.delete('/api/offer/:pid/:oid', db.offer.deleteOffer)

// Chat endpoints
app.get('/api/chat', db.chat.getAllChats)
app.get('/api/chat/:id', db.chat.getAllUserChats)
app.get('/api/chat/:accID1/:accID2', db.chat.getUserChat)
app.post('/api/chat/:accID1/:accID2', db.chat.createChat)

// Rating endpoints
app.get('/api/rating', db.rating.getAllRatings)
app.get('/api/rating/:id', db.rating.getUserRatings)
app.post('/api/rating/:id', db.rating.createRating)
app.delete('/api/rating/:id', db.rating.deleteAllUserRatings)
app.delete('/api/rating/:rateeID/:ratingID', db.rating.deleteUserRating)

// Notification endpoints
app.get('/api/notification', db.notification.getAllNotifications)
app.get('/api/notification/:id', db.notification.getAllUserNotifications)
app.get('/api/notification/:accID/:notifID', db.notification.getUserNotification)
app.post('/api/notification/:id', db.notification.createNotification)
app.delete('/api/notification/:id', db.notification.deleteAllUserNotifications)
app.delete('/api/notification/:accID/:notifID', db.notification.deleteUserNotification)

// Location endpoints
app.get('/api/location/vet', db.location.getVets);
app.get('/api/location/park', db.location.getParks);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
