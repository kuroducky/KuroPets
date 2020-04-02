const pool = require('./connect')
const mailer = require('./email')

/**
 * The function getAllOffers gets all offers available in the database by running a "SELECT" query on tbl_Offers
 * and outputting the result in a JSON string format in the parameter response. 
 * @param {JSON} request 
 * @param {JSON} response 
 */
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

/**
 * The getAllPostOffers will take in the postID from the endpoint and store it in the request parameter.The postID will
 * then be used by the "SELECT" query to find out all offers available corresponding to the postID in "tbl_Offers".
 * @param {JSON} request 
 * @param {JSON} response 
 */
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

/**
 * This function will take in the value of offerID that is available in the endpoint and store it into the request parameter.
 * The function will then make use of the input to perform a "SELECT" query to find out details that corresponds to the offerID attribute
 * that is available in "tbl_Offers".
 * @param {JSON} request 
 * @param {JSON} response 
 */
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


/**
 * The function getAllUserOffers will take in the accountID from the endpoint and store in the parameter request.
 * The parameter will be used by in a "SELECT" query to find out all offers that are made by that accountID.
 * @param {JSON} request 
 * @param {JSON} response 
 */
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


/**
 * The function createOffer will take in inputs that are required for the creation process and store it in the parameter 
 * request. An "INSERT" query will then be performed that makes use of the values that are stored in the request parameter 
 * and insert them into the table "tbl_Offers".
 * @param {JSON} request 
 * @param {JSON} response 
 */
const createOffer = (request, response) => {
    const { postID, accountID, price, paymentType} = request.body
    pool.query('INSERT INTO "tbl_Offers" ("postID", "accountID", "price", "paymentType", "status") VALUES ($1, $2, $3, $4, \'Pending\') RETURNING *',
    [postID, accountID, price, paymentType],
    (error, results) => {
        if(error){
            throw error
        }
        pool.query('SELECT * FROM "tbl_Post" WHERE "postID" = $1',
        [postID],
        (error, results) => {
            if(error){
                throw error
            }
            let title = results.rows[0].title
            pool.query('SELECT * FROM "tbl_Account" WHERE "accountID" = $1', [results.rows[0].accountID], (err, results) => {
                if (err) throw err;
                console.log(results.rows[0])
                mailer.sendMail(results.rows[0].email, `An offer has been made for your post "${title}"!`)
            })
        })
        response.status(418).json(results.rows[0])
    })
}

/**
 * The function updateOffer will take in the inputs that are required by the table in database
 * and change all the current available values to the newly inserted inputs. The "UPDATE" query 
 * will be called in the function to insert the newly inserted inputs and update current available 
 * inputs in the database tbl_Offers.
 * @param {JSON} request 
 * @param {JSON} response 
 */
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

// const deleteAllOffers = (request, response) => {
//     const id = parseInt(request.params.id)
//     pool.query('DELETE FROM "tbl_Offers" WHERE "postID" = $1',
//     [id],
//     (error, results) => {
//         if(error){
//             throw error
//         }
//         response.status(418).send(`All Offers deleted.`)
//     })
// }

/**
 * The function deleteOffer will take in the offerID from the URL endpoint 
 * and store it in parameters. A "DELETE" query will be performed based on 
 * the offerID that is available from the parameter request, and it will 
 * find the corresponding offerID in tbl_Offers that is located in the 
 * database and delete it accordingly.
 * @param {*} req 
 * @param {*} res 
 */
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
