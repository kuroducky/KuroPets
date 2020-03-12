const pool = require('./connect')

const getPost = (req, res) =>
{
    var count = 0;
    var total;
    var posts = [];

    // pool.query('SELECT * FROM "tbl_Post"', (error, results) =>
    // {
    //     if(error)
    //     {
    //         throw error;
    //     }
    //     total = results.rows.length;
    //     results.rows.forEach(row => {
    //         row.images = [];
    //         pool.query('SELECT * FROM "tbl_Images" WHERE "postID" = $1;', [row.postID], (error,results) =>
    //         {
    //             if(error)
    //                 throw error;
    //             results.rows.forEach(image => row.images.push(image.url));
    //             posts.push(row);
    //             count++;
    //             if (count == total){
    //                 res.status(200).json(posts);
    //             }
    //         })
    //     });
    // });
    pool
        .query('SELECT * FROM "tbl_Post"')
        .then(results =>
            {
                total = results.rows.length;
                results.rows.forEach(row => {
                    row.user = [];
                    pool
                        .query('SELECT "accountID", "name", "phone" FROM "tbl_Account" WHERE "postID" = $1 RETURNING *;', [row.postID])
                        .then(results =>
                            {
                                row.user.push(results);
                                console.log(results);
                                posts.push(row);
                                row.images = [];
                                pool
                                    .query('SELECT * FROM "tbl_Images" WHERE "postID" = $1;', [row.postID])
                                    .then(results => {
                                        results.rows.forEach(image => row.images.push(image.url));
                                        posts.push(row);
                                        count++;
                                        if (count == total){
                                            res.status(200).json(posts);
                                        }
                                    })
                                    .catch(error => console.error(error.stack))
                            })
                        .catch(error => console.error(error.stack))
                })
            })
        .catch(error => console.error(error.stack))
}

const getAllAccountPost = (req,res) =>
{
    const accountID = parseInt(req.params.id);
    var count = 0;
    var total;
    var posts = [];

    pool.query('SELECT * FROM "tbl_Post" WHERE "accountID" = $1' , [accountID], (error, results) =>

    {
        if(error)
        {
            throw error;
        }
        total = results.rows.length;
        results.rows.forEach(row => {
            row.images = [];
            pool.query('SELECT * FROM "tbl_Images" WHERE "postID" = $1;', [row.postID], (error,results) =>
            {
                if(error)
                    throw error;
                results.rows.forEach(image => row.images.push(image.url));
                posts.push(row);
                count++;
                if (count == total){
                    res.status(200).json(posts);
                }
            })
        });
    })
}

const getOneAccountPost = (req, res) =>
{
    const accountID = parseInt(req.params.id)
    const postID = parseInt(req.params.pid)
    var post = [];

    pool.query('SELECT * FROM "tbl_Post" WHERE "accountID" = $1 AND "postID" = $2' , [accountID, postID], (error,results) =>
    {
        if(error)
        {
            throw error;
        }
        post.push(results.rows[0]);
        pool.query('SELECT * FROM "tbl_Images" WHERE "postID" = $1;', [postID], (error,results) =>
        {
            if(error)
                throw error;
            post[0].images = [];
            results.rows.forEach(image => post[0].images.push(image.url));
            res.status(200).json(post[0]);
        })
    })
}

const createPost = (req,res) =>
{
    const accountID = parseInt(req.params.id);
    const {title, description, location, startDate, endDate, typeOfPet, service} = req.body
    pool.query('INSERT INTO "tbl_Post"("status", "title", "description", "location", "startDate", "endDate", "timestamp", "typeOfPet", "service", "accountID") VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, $7, $8, $9) RETURNING *;',
    ['Pending Service', title, description, location, startDate, endDate, typeOfPet, service, accountID],
    (error,results) =>
    {
        if(error)
            throw error;

        var images = req.body.images;
        var msg = results.rows[0];
        msg.images = []
        if (images === undefined || images.length == 0){
            res.status(200).json(msg);
        }
        else {
            var postID = msg.postID;
            var imageTotal = images.length;
            var count = 0;

            images.forEach(url => {
                pool.query('INSERT INTO "tbl_Images" ("url","postID") VALUES ($1,$2) RETURNING *; ', [url,postID], (error,imgResults) =>
                {
                    if (error)
                        throw error;
                    
                    count++;
                    msg.images.push(url);
                    if (count == imageTotal){
                        res.status(200).json(msg)
                    }
                })
            })
        }
    })
}

const updatePost = (req,res) =>
{
    const accountID = parseInt(req.params.id)
    const postID = parseInt(req.params.pid)

    const {status, title, description, location, startDate, endDate, typeOfPet, service} = req.body;

    pool.query('UPDATE "tbl_Post" SET "status" = $1, "title" = $2, "description" = $3, "location" = $4, "startDate" = $5, "endDate" = $6, "timestamp" = current_timestamp, "typeOfPet" = $7, "service" = $8 WHERE "accountID" = $9 AND "postID" = $10 RETURNING *;',
    [status, title, description, location, startDate, endDate, typeOfPet, service, accountID, postID],
    (error, results) =>
    {
        if(error)
            throw error;
        res.status(201).json(results.rows[0]);
    })
}

const deletePost = (req,res) =>
{
    const accountID = parseInt(req.params.id);
    const postID = parseInt(req.params.pid);

    pool.query('DELETE FROM "tbl_Post" WHERE "postID" = $1;', [postID], (error, results) => {
        if (error) {
            throw error;
        }

        pool.query('DELETE FROM "tbl_Images" WHERE "postID" = $1', [postID], (error,results) =>
        {
            if (error)
                throw error;

            res.status(200).send(`PostID of ${postID}`)
        })
    })
}


module.exports = {
    getPost,
    getAllAccountPost,
    getOneAccountPost,
    createPost,
    updatePost,
    deletePost
}


// // GET
// /api/post - Get all posts
// /api/post/{accountID} - Gets all posts by a specific user
// /api/post/{accountID}/{postID} - Gets a specific post


// //POST
// /api/post/{accountID} - Creates a new post


// //PUT
// /api/post/{accountID}/{postID} - Updates a post from a user


// //DELETE
// /api/post/{accountID} - Deletes all posts from a user
// /api/post/{accountID}/{postID} - Deletes a specific post from a user
