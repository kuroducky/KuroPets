const pool = require('./connect')

const getAllRatings = (request, response) => {
    pool.query('SELECT * FROM "tbl_Rating"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserRatings = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM "tbl_Rating" WHERE "ratingID" = $1',
    [id],
    (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createRating = (request, response) => {
    const ratingID = parseInt(request.params.id)
    const {raterID, rateeID, ratingValue, ratingFeedback} = request.body
    pool.query('INSERT INTO "tbl_Rating" ("raterID", "rateeID", "ratingValue", "ratingFeedback") VALUES ($1, $2, $3, $4) RETURNING *;',
    [raterID, rateeID, ratingValue, ratingFeedback],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Rating given with ID: ${ratingID}`)
    })
}

const deleteAllUserRatings = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM "tbl_Rating" WHERE "rateeID" = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Rating deleted for user with ID ${id}`)
    })
}

const deleteUserRating = (request, response) => {
    const rateeID = parseInt(request.params.rateeID)
    const ratingID = parseInt(request.params.ratingID)
    pool.query('DELETE FROM "tbl_Rating" where "rateeID" = $1 AND "ratingID" = $2',
    [rateeID, ratingID],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Rating deleted for user with ID ${rateeID} and rating with ID ${ratingID}`)
    })
}


module.exports = {
    getAllRatings,
    getUserRatings,
    createRating,
    deleteAllUserRatings,
    deleteUserRating
};
