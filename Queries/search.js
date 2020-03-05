const pool = require('./connect')

const searchPost = (req, res) => {
    var parameters = {};

    if(req.body.postTitle !== undefined)
        parameters.postTitle = request.body.postTitle;

    if(req.body.postDescription !== undefined)
        parameters.postDescription = request.body.postDescription;

    if(req.body.postLocation !== undefined)
        parameters.postLocation = request.body.postLocation;

    if(req.body.periodOfCaretaking !== undefined)
        parameters.periodOfCaretaking = request.body.periodOfCaretaking;

    if(req.body.TypeOfPet !== undefined)
        parameters.TypeOfPet = request.body.TypeOfPet;

    if(req.body.TypeOfService !== undefined)
        parameters.TypeOfService = request.body.TypeOfService;

    if (Object.keys(parameters).length == 0){
        pool.query('SELECT * FROM "tbl_Post"', (error, results) => {
            if (error){
                throw error;
            }
            res.status(200).json(result.rows);
        });
    }
    else {
        var queryString = '';
        for (const key in parameters){
            if (key = 'periodOfCaretaking'){
                queryString += ` AND "postEndDate" - "postStartDate" = ${parameters[key]}`;
            }
            else {
                queryString += ` AND "${key}" = ${parameters[key]}`;
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
    if (req.body.accountName == undefined){
        pool.query('SELECT * FROM "tbl_Account"', (error, results) => {
            if (error){
                throw error;
            }
            res.status(200).json(result.rows);
        });
    }
    else {
        const { accountName } = req.body;

        pool.query('SELECT * FROM "tbl_Account" WHERE "accountName" = $1', [accountName], (error, results) => {
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
