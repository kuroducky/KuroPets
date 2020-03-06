const pool = require('./connect')

const searchPost = (req, res) => {
    var parameters = {};

    if(req.query.postTitle !== undefined)
        parameters.postTitle = req.query.postTitle;

    if(req.query.postDescription !== undefined)
        parameters.postDescription = req.query.postDescription;

    if(req.query.postLocation !== undefined)
        parameters.postLocation = req.query.postLocation;

    if(req.query.periodOfCaretaking !== undefined)
        parameters.periodOfCaretaking = req.query.periodOfCaretaking;

    if(req.query.TypeOfPet !== undefined)
        parameters.TypeOfPet = req.query.TypeOfPet;

    if(req.query.TypeOfService !== undefined)
        parameters.TypeOfService = req.query.TypeOfService;

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
                queryString += ` AND "${key}" = ${parameters[key]}`;
            }
        }
        queryString = queryString.substring(5);
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
    if (req.query.accountName === undefined){
        pool.query('SELECT * FROM "tbl_Account"', (error, results) => {
            if (error){
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }
    else {
        pool.query('SELECT * FROM "tbl_Account" WHERE "accountName" ILIKE $1', [`%${req.query.accountName}%`], (error, results) => {
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
