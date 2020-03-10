const pool = require('./connect')

const getAllOffers = (request, response) => {
    pool.query('SELECT * FROM "tbl_Offers"',
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllPostOffers = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM "tbl_Offers" WHERE "postID" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
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
        response.status(200).json(results.rows)
    })
}

const getAllUserOffers = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM "tbl_Offers" WHERE "accountID" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
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
        response.status(200).send(`Offer created with ID: ${results.rows[0].offerID}`)
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
        response.status(200).send(`Offer updated.`)
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
        response.status(200).send(`All Offers deleted.`)
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
        response.status(200).send(`Offer for the post has been deleted`)
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
