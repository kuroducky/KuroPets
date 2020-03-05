const searchPost = (request, response) => {
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

    if (Object.keys(parameters).length = 0){
        pool.query('SELECT * FROM tbl_post', (error, results) => {
            if (error){
                throw error;
            }
            response.status(200).json(result.rows);
        });
    }
    else {
        var queryString = '';
        for (const key in parameters){
            if (key = 'periodOfCaretaking'){
                queryString += ` AND postEndDate - postStartDate = ${parameters[key]}`;
            }
            else {
                queryString += ` AND ${key} = ${parameters[key]}`;
            }
        }
        queryString = queryString.substring(4);

        pool.query('SELECT * FROM tbl_post WHERE $1', [queryString], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    }
}

const searchUser = (request, response) => {
    var parameters = {};

    if(req.body.accountName !== undefined)
        parameters.accountName = request.body.accountName;

    if(req.body.TypeOfService !== undefined)
        parameters.TypeOfService = request.body.TypeOfService;

    if (Object.keys(parameters).length = 0){
        pool.query('SELECT * FROM tbl_user', (error, results) => {
            if (error){
                throw error;
            }
            response.status(200).json(result.rows);
        });
    }
    else {
        var queryString = '';
        for (const key in parameters){
            if (key = 'periodOfCaretaking'){
                queryString += ` AND postEndDate - postStartDate = ${parameters[key]}`;
            }
            else {
                queryString += ` AND ${key} = ${parameters[key]}`;
            }
        }
        queryString = queryString.substring(4);

        pool.query('SELECT * FROM tbl_user WHERE $1', [queryString], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    }
}

/*
app.get('/api/search/post', db.searchPost)
app.get('/api/search/user', db.searchUser)
*/

module.exports = {
    searchPost,
    searchUser
};
