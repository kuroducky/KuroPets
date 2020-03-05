const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const db = requireDir('./Queries');

const app = express();
const port = 3000;

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
app.put('/api/user/:id', db.account.updateUser);
app.delete('/api/user/:id', db.account.deleteUser);

// Search endpoints
app.get('/api/search/post', db.search.searchPost);
app.get('/api/search/user', db.search.searchUser);

// Post endpoints
app.get('/api/post', db.post.getPost);
app.get('/api/post/:id', db.post.getAllAccountPost);
app.get('/api/post/:id/:pid', db.post.getOneAccountPost);
app.post('/api/post', db.post.createPost);
app.put('/api/post/:id/:pid', db.post.updatePost);
app.delete('/api/post/:id/:pid', db.post.deletePost);

// Image endpoints
app.get('/api/image/:pid', db.image.getImages)
app.get('/api/image/:pid/:imid', db.image.getOneImage)
app.post('/api/image/:pid', db.image.postImage)
app.put('/api/image/:id/:imid', db.image.updatePost)
app.delete('/api/image/:pid', db.image.deleteAllImages)
app.delete('/api/image/:pid/:imid', db.image.deleteOneImage)

// Offer endpoints
app.get('/offer', db.offer.getAllOffers)
app.get('/offer/:id', db.offer.getAllPostOffers)
app.get('/offer/:pid/:oid', db.offer.getPostOffer)
app.get('/user/:id/offer', db.offer.getAllUserOffers)
app.post('/offer/:id', db.offer.createOffer)
app.put('/offer/:pid/:oid', db.offer.updateOffer)
app.delete('/offer/:id', db.offer.deleteAllOffers)
app.delete('/offer/:pid/:oid', db.deleteOffer)

// Chat endpoints
app.get('/chat', db.chat.getAllChats)
app.get('/chat/:id', db.chat.getAllUserChats)
app.get('/chat/:accID1/:accID2', db.chat.getUserChat)
app.post('/chat/:accID1/:accID2', db.chat.createChat)

// Rating endpoints
app.get('/rating', db.rating.getAllRatings)
app.get('/rating/:id', db.rating.getUserRatings)
app.post('/rating/:id', db.rating.createRating)
app.delete('/rating/:id', db.rating.deleteAllUserRatings)
app.delete('/rating/:rateeID/:ratingID', db.rating.deleteUserRating)

// Notification endpoints
app.get('/notification', db.notification.getAllNotifications)
app.get('/notification/:id', db.notification.getAllUserNotifications)
app.get('/notification/:accID/:notifID', db.notification.getUserNotification)
app.post('/notification/:id', db.notification.createNotification)
app.delete('/notification/:id', db.notification.deleteAllUserNotifications)
app.delete('/notification/:accID/:notifID', db.notification.deleteUserNotification)

// Location endpoints
app.get('/api/location/vet', db.location.getVets);
app.get('/api/location/park', db.location.getParks);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
