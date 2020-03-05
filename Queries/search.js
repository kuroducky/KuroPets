const pool = require('./connect')

const searchPost = (req, res) => {
    var parameters = {};

    if(req.body.postTitle !== undefined)
        parameters.postTitle = req.body.postTitle;

    if(req.body.postDescription !== undefined)
        parameters.postDescription = req.body.postDescription;

    if(req.body.postLocation !== undefined)
        parameters.postLocation = req.body.postLocation;

    if(req.body.periodOfCaretaking !== undefined)
        parameters.periodOfCaretaking = req.body.periodOfCaretaking;

    if(req.body.TypeOfPet !== undefined)
        parameters.TypeOfPet = req.body.TypeOfPet;

    if(req.body.TypeOfService !== undefined)
        parameters.TypeOfService = req.body.TypeOfService;

    if (Object.keys(parameters).length == 0){
        pool.query('SELECT * FROM "tbl_Post"', (error, results) => {
            if (error){
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }
    else {
        var queryString = '';
        for (const key in parameters){
            if (key == 'periodOfCaretaking'){
                queryString += ` AND "postEndDate" - "postStartDate" = ${parameters[key]}`;
            }
            else {
                queryString += ` AND "${key}" ILIKE '%${parameters[key]}%'`;
            }
        }
        queryString = queryString.substring(4);
        console.log(queryString)

        pool.query('SELECT * FROM "tbl_Post" WHERE $1', [queryString], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }
}

const searchUser = (req, res) => {
    if (req.body.accountName === undefined){
        pool.query('SELECT * FROM "tbl_Account"', (error, results) => {
            if (error){
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }
    else {
        pool.query('SELECT * FROM "tbl_Account" WHERE "accountName" ILIKE $1', [`%${req.body.accountName}%`], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }
}

module.exports = {
    searchPost,
    searchUser
};
