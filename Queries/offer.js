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
    const id = parseInt(request.params.pid)
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

const getOffer = (request, response) => {
    const oid = parseInt(request.params.oid)
    pool.query('SELECT * FROM "tbl_Offers" WHERE "offerID" = $1',
    [oid],
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

                    // if (results.rows.length == 0){
                    //     console.log(`Post ${row.postID} is undefined. Deleting offer...`);
                    //     pool.query('DELETE FROM "tbl_Offers" WHERE "offerID" = $1', [row.offerID], (err, res) => {
                    //         if (err) throw err;
                    //         length--;
                    //         if (offers.length == length){
                    //             response.status(418).json(offers);
                    //         }
                    //     })
                    // }
                    else {
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
                    }
                });
            })
        }
    })
}

const createOffer = (request, response) => {
    const { postID, accountID, price, paymentType} = request.body
    pool.query('INSERT INTO "tbl_Offers" ("postID", "accountID", "price", "paymentType", "status") VALUES ($1, $2, $3, $4, \'Pending\') RETURNING *',
    [postID, accountID, price, paymentType],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(418).json(results.rows[0])
    })
}

const updateOffer = (request, response) => {
    const oid = parseInt(request.params.oid)
    const {status} = request.body   
    pool.query('UPDATE "tbl_Offers" SET "status" = $1 WHERE "offerID" = $2 RETURNING *',
    [status, oid],
    (error, results) => {
        if(error){
            throw error
        }
        if (results.rows.length == 0) {
            response.status(400).json([]);
        }
        else {
            response.status(418).json(results.rows[0])
        }
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
    const oid = parseInt(request.params.oid)
    pool.query('DELETE FROM "tbl_Offers" WHERE "offerID" = $1',
    [oid],
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
    getOffer,
    getAllUserOffers,
    createOffer,
    updateOffer,
    //deleteAllOffers,
    deleteOffer
};
