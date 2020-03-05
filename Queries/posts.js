const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kuropets_db',
  password: 'Kuroducky',
  port: 5432,
})


const getPost = (req, res) => 
{
    pool.query('SELECT * FROM "tbl_Post"'), (error, results) => 
    {
        if(error)
        {
            throw error;
        }
        res.status(200).json(results.rows);
    }
}

const getAllAccountPost = (req,res) => 
{
    const accountID = parseInt(req.params.id)

    pool.query('SELECT * FROM "tbl_Post" WHERE accountID = $1' ), [accountID], (error, results) => 

    {
        if(error)
        {
            throw error;
        }
        res.status(200).json(results.rows)
    }
}

const getOneAccountPost = (req, res) => 
{
    const accountID = parseInt(req.params.id)
    const postID = parseInt(req.params.pid)
    pool.query('SELECT * FROM "tbl_Post" WHERE accountID = $1 AND postID = $2') , [accountID, postID], (error,results) =>
    {
        if(error)
        {
            throw error;
        }
        res.status(200).json(results.rows);
    }
}

const createPost = (req,res) =>
{
    const accountID = parseInt(req.params.id)

    const {postStatus, postTitle, postDescription, postLocation, postStartDate, postEndDate, postDate, postTypeOfPet, postService} = req.body

    pool.query('INSERT INTO "tbl_Post"("postStatus", "postTitle", "postDescription", "postLocation", "postStartDate", "postEndDate", "postDate", "postTypeOfPet", "postService") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 WHERE accountID = $10', [postStatus, postTitle, postDescription, postLocation, postStartDate, postEndDate, postDate, postTypeOfPet, postService, accountID], (error,results) => 
    {
        if(error)
            throw error;
        res.status(201).send(`${result.postTitle} added by ${results.accountID}`);
    
    })
}

const updatePost = (req,res) =>
{
    const accountID = parseInt(req.params.id)
    const postID = parseInt(req.params.pid)

    const {postStatus, postTitle, postDescription, postLocation, postStartDate, postEndDate, postDate, postTypeOfPet, postService} = req.body

    pool.query('UPDATE "tbl_Post" SET postStatus = $1, postTitle = $2, postDescription = $3, postLocation = $4, postStartDate = $5, postEndDate = $6, postDate = $7, postTypeOfPet = $8, postService = $9 WHERE accountID = $10 AND postID = $11') , [postStatus, postTitle, postDescription, postLocation, postStartDate, postEndDate, postDate, postTypeOfPet, postService, accountID, postID], (error, results) => 
    {
        if(error)
            throw error;
        res.status(201).send(`${results.postID} updated by ${results.accountID}`)
    }
}

const deletePost = (req,res) =>
{
    const accountID = parseInt(req.params.id);
    const postID = parseInt(req.params.pid);

    pool.query('DELETE FROM "tbl_Post WHERE postID = $1', [postID], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`PostID of ${postID}`)
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