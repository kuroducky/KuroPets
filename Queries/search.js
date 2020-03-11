const pool = require('./connect')

const searchPost = (req, res) => {
    var parameters = {};

    if(req.query.title !== undefined)
        parameters.title = req.query.title;

    if(req.query.description !== undefined)
        parameters.description = req.query.description;

    if(req.query.location !== undefined)
        parameters.location = req.query.location;

    if(req.query.typeOfPet !== undefined)
        parameters.typeOfPet = req.query.typeOfPet;

    if(req.query.service !== undefined)
        parameters.service = req.query.service;


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
                    return post.endDate - post.startDate == req.query.periodOfCaretaking;
                }
                return true;
            })
            res.status(200).json(reply);
        }
    });
}

const searchUser = (req, res) => {
    if (req.query.name === undefined){
        pool.query('SELECT * FROM "tbl_Account"', (error, results) => {
            if (error){
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }
    else {
        pool.query('SELECT * FROM "tbl_Account" WHERE "name" ILIKE $1', [`%${req.query.name}%`], (error, results) => {
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
