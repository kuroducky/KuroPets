const pool = require('./connect')

const getPost = (req, res) =>
{
    var count = 0;
    var total;
    var posts = [];

    pool.query('SELECT * FROM "tbl_Post"', (error, results) =>
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
                results.rows.forEach(image => row.images.push(image.imageURL));
                posts.push(row);
                count++;
                if (count == total){
                    res.status(200).json(posts);
                }
            })
        });
    });
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
                results.rows.forEach(image => row.images.push(image.imageURL));
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
            results.rows.forEach(image => post[0].images.push(image.imageURL));
            res.status(200).json(post[0]);
        })
    })
}

const createPost = (req,res) =>
{
    const accountID = parseInt(req.params.id);
    const {postTitle, postDescription, postLocation, postStartDate, postEndDate, postTypeOfPet, postService} = req.body
    pool.query('INSERT INTO "tbl_Post"("postStatus", "postTitle", "postDescription", "postLocation", "postStartDate", "postEndDate", "postDate", "postTypeOfPet", "postService", "accountID") VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, $7, $8, $9) RETURNING *;',
    ['Pending Service', postTitle, postDescription, postLocation, postStartDate, postEndDate, postTypeOfPet, postService, accountID],
    (error,results) =>
    {
        if(error)
            throw error;
        res.status(201).json(results.rows[0]);
    })
}

const updatePost = (req,res) =>
{
    const accountID = parseInt(req.params.id)
    const postID = parseInt(req.params.pid)

    const {postStatus, postTitle, postDescription, postLocation, postStartDate, postEndDate, postTypeOfPet, postService} = req.body;

    pool.query('UPDATE "tbl_Post" SET "postStatus" = $1, "postTitle" = $2, "postDescription" = $3, "postLocation" = $4, "postStartDate" = $5, "postEndDate" = $6, "postDate" = current_timestamp, "postTypeOfPet" = $7, "postService" = $8 WHERE "accountID" = $9 AND "postID" = $10 RETURNING *;',
    [postStatus, postTitle, postDescription, postLocation, postStartDate, postEndDate, postTypeOfPet, postService, accountID, postID],
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
