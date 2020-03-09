const pool = require('./connect')

const searchPost = (req, res) => {
    var parameters = {};

    if(req.query.postTitle !== undefined)
        parameters.postTitle = req.query.postTitle;

    if(req.query.postDescription !== undefined)
        parameters.postDescription = req.query.postDescription;

    if(req.query.postLocation !== undefined)
        parameters.postLocation = req.query.postLocation;

    if(req.query.postTypeOfPet !== undefined)
        parameters.postTypeOfPet = req.query.postTypeOfPet;

    if(req.query.postService !== undefined)
        parameters.postService = req.query.postService;


    pool.query('SELECT * FROM "tbl_Post"', (error, results) => {
        if (error){
            throw error;
        }

        if (Object.keys(parameters).length == 0 || results.rows[0] === undefined){
            res.status(200).json(results.rows);
        }
        else {
            const reply = results.rows.filter(post => {
                for (const key in parameters){
                    var lowerCasePost = post[key].toLowerCase();
                    if (!lowerCasePost.includes(parameters[key].toLowerCase())){
                        return false;
                    }
                }

                if(req.query.periodOfCaretaking !== undefined) {
                    return post.postEndDate - post.postStartDate == req.query.periodOfCaretaking;
                }
                return true;
            })
            res.status(200).json(reply);
        }
    });
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
