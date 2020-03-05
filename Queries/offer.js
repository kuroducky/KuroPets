import { Pool } from "pg"
import { response } from "express"
import { parse } from "querystring"

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
    pool.query('SELECT * FROM "tbl_Offers" WHERE postID = $1',
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
    pool.query('SELECT * FROM "tbl_Offers" WHERE postID = $1 AND offerID = $2',
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
    pool.query('SELECT * FROM "tbl_Offers" WHERE accountID = $1',
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
    const {accID, offerPrice, offerPayment} = request.body
    pool.query('INSERT INTO "tbl_Offers" (postID, accountID, offerPrice, offerPaymentType, offerStatus) VALUES ($1, $2, $3, $4, "Pending"',
    [id, accID, offerPrice, offerPayment],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Offer created with ID: ${results.insertID}`)
    })
}

const updateOffer = (request, response) => {
    const pid = parseInt(request.params.pid)
    const oid = parseInt(request.params.oid)
    const {accID, offerPrice, offerPayment, offerStatus} = request.body
    pool.query('UPDATE "tbl_Offers" SET offerPrice = $1, offerPayment = $2, offerStatus = $3 WHERE postID = $4 AND offerID = $5 AND accountID = $6',
    [offerPrice, offerPayment, offerStatus, pid, oid, accID],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Offer updated.`)
    })
}

const deleteAllOffers = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM "tbl_Offers" WHERE postID = $1',
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
    pool.query('DELETE FROM "tbl_Offers" WHERE postID = $1 AND offerID = $2',
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

// app.get('/offer', db.offer.getAllOffers)
// app.get('/offer/:id', db.offer.getAllPostOffers)
// app.get('/offer/:pid/:oid', db.offer.getPostOffer)
// app.get('/user/:id/offer', db.offer.getAllUserOffers)
// app.post('/offer/:id', db.offer.createOffer)
// app.put('/offer/:pid/:oid', db.offer.updateOffer)
// app.delete('/offer/:id', db.offer.deleteAllOffers)
// app.delete('/offer/:pid/:oid', db.deleteOffer)