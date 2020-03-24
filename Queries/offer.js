const pool = require('./connect')

const getAllOffers = (request, response) => {
    let length;
    let offers = [];

    pool.query('SELECT * FROM "tbl_Offers"',
    (error, results) => {
        if(error){
            throw error
        }
        length = results.rows.length;

        if (length == 0){
            response.status(400).json(offers);
        }
        else {
            results.rows.forEach(row => {
                pool.query('SELECT "accountID", "name", "phone", "rating", "totalNumRatings" FROM "tbl_Account" WHERE "accountID" = $1', [row.accountID], (err, results) => {
                    if (err) throw err;
                    row.user = results.rows[0];
                    offers.push(row);
    
                    if (offers.length == length){
                        response.status(418).json(offers);
                    }
                });
            })
        }
    });
}

const getAllPostOffers = (request, response) => {
    const id = parseInt(request.params.id)
    let length;
    let offers = [];

    pool.query('SELECT * FROM "tbl_Offers" WHERE "postID" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }

        length = results.rows.length;
        if (length == 0){
            response.status(400).json(offers);
        }
        else {
            results.rows.forEach(row => {
                pool.query('SELECT "accountID", "name", "phone", "rating", "totalNumRatings" FROM "tbl_Account" WHERE "accountID" = $1', [row.accountID], (err, results) => {
                    if (err) throw err;
                    row.user = results.rows[0];
                    offers.push(row);
    
                    if (offers.length == length){
                        response.status(418).json(offers);
                    }
                });
            })
        }
    })
}

const getPostOffer = (request, response) => {
    const pid = parseInt(request.params.pid)
    const oid = parseInt(request.params.oid)
    pool.query('SELECT * FROM "tbl_Offers" WHERE "postID" = $1 AND "offerID" = $2',
    [pid, oid],
    (error, results) => {
        if(error){
            throw error
        }
        if (results.rows.length == 0){
            response.send(400).json(null);
        }
        else {
            let offer = results.rows[0];
            pool.query('SELECT "accountID", "name", "phone", "rating", "totalNumRatings" FROM "tbl_Account" WHERE "accountID" = $1', [offer.accountID], (err, results) => {
                if (err) throw err;
                offer.user = results.rows[0];
                response.status(418).json(offer);
            });
        }
    })
}

const getAllUserOffers = (request, response) => {
    const id = parseInt(request.params.id)
    let length;
    let offers =[];

    pool.query('SELECT * FROM "tbl_Offers" WHERE "accountID" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        length = results.rows.length;
        if (length == 0){
            response.status(400).json(offers)
        }
        else {
            results.rows.forEach(row => {
                pool.query('SELECT "postID", "title", "description" FROM "tbl_Post" WHERE "postID" = $1', [row.postID], (err, results) => {
                    if (err) throw err;
                    row.post = results.rows[0];
                    row.post.images = []
                    pool.query('SELECT "url" FROM "tbl_Images" WHERE "postID" = $1', [row.postID], (err, results) => {
                        if (err) throw err;
                        results.rows.forEach(img => row.post.images.push(img.url));
                        offers.push(row);
                        if (offers.length == length){
                            response.status(418).json(offers);
                        }
                    })
                });
            })
        }
    })
}

const createOffer = (request, response) => {
    const id = parseInt(request.params.id)
    const {accountID, price, paymentType} = request.body
    pool.query('INSERT INTO "tbl_Offers" ("postID", "accountID", "price", "paymentType", "status") VALUES ($1, $2, $3, $4, \'Pending\') RETURNING *',
    [id, accountID, price, paymentType],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).send(`Offer created with ID: ${results.rows[0].offerID}`)
    })
}

const updateOffer = (request, response) => {
    const pid = parseInt(request.params.pid)
    const oid = parseInt(request.params.oid)
    const {price, paymentType, status} = request.body   
    pool.query('UPDATE "tbl_Offers" SET "price" = $1, "paymentType" = $2, "status" = $3 WHERE "postID" = $4 AND "offerID" = $5 RETURNING *',
    [price, paymentType, status, pid, oid],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).send(`Offer updated.`)
    })
}

const deleteAllOffers = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM "tbl_Offers" WHERE "postID" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).send(`All Offers deleted.`)
    })
}

const deleteOffer = (request, response) => {
    const pid = parseInt(request.params.pid)
    const oid = parseInt(request.params.oid)
    pool.query('DELETE FROM "tbl_Offers" WHERE "postID" = $1 AND "offerID" = $2',
    [pid, oid],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).send(`Offer for the post has been deleted`)
    })
}

module.exports = {
    getAllOffers,
    getAllPostOffers,
    getPostOffer,
    getAllUserOffers,
    createOffer,
    updateOffer,
    deleteAllOffers,
    deleteOffer
};
