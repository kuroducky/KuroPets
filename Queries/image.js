const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kuropets_db',
  password: 'Kuroducky',
  port: 5432,
})



const getImages = (req, res) => 
{
    const postID = parseInt(req.params.pid)
    
    pool.query('SELECT * FROM "tbl_Images" WHERE postID = $1'), [postID], (error,results) =>
    {
        if(error)
            throw error;
        res.status(200).json(results.rows);
    }  
}

const getOneImage = (req, res) => 
{
    const postID = parseInt(req.params.pid)
    const imageID = parseInt(req.params.imid)
    
    pool.query('SELECT * FROM "tbl_Images" WHERE postID = $1 AND imageID =$2'), [postID, imageID], (error,results) =>
    {
        if(error)
            throw error;
        res.status(200).json(results.rows);
    }  
}


const postImage = (req,res) => 
{
    const postID = parseInt(req.params.pid);
    const {imageURL} = req.body;

    pool.query('INSERT INTO "tbl_Images" (imageURL) VALUES ($1) WHERE postID = $2'), [imageURL, postID], (error,results) => 
    {
        if (error)
            throw error;
        res.status(201).send(`Image has been posted to postID = ${postID}`);
    }
}



const updateImage = (req,res) => 
{
    const postID = parseInt(req.params.pid);
    const imageID = parseInt(req.params.imid);

    const {imageURL} = req.body;

    pool.query('UPDATE "tbl_Images" SET imageURL = $1 WHERE postID = $2 AND imageID = $3 '), [imageURL, postID, imageID], (error,results) => 
    {
        if (error)
            throw error;
        res.status(201).send(`Image has been updated in postID = ${postID}`);
    }
}

const deleteAllImages = (req,res) => 
{
    const postID = parseInt(req.params.pid);

    pool.query('DELETE FROM "tbl_Images" WHERE postID = $1'), [postID], (error,results) => 
    {
        if (error)
            throw error;
        res.status(201).send(`All images have been removed from in postID = ${postID}`);
    }
}

const deleteOneImage = (req,res) => 
{
    const postID = parseInt(req.params.pid);
    const imageID = parseInt(req.params.imid);

    pool.query('DELETE FROM "tbl_Images" WHERE postID = $1 AND imageID = $2'), [postID, imageID], (error,results) => 
    {
        if (error)
            throw error;
        res.status(201).send(`ImageID ${imageID} have been removed from in postID = ${postID}`);
    }
}


module.exports = {
    getImages,
    getOneImage,
    postImage,
    updateImage,
    deleteAllImages,
    deleteOneImage
  }


  // // GET 
// app.get('/api/image/:id', db.image.getImages) - Get all images from post 
// app.get('/api/image/:id/:imid', db.image.getOneImage) - Gets one image from a post. 



// //POST 
// app.post('/api/image/:id', db.image.postImage) - Posts a new image 


// //PUT 
// app.put('/api/image/:id/:imid', db.image.updatePost) - Updates an image from a post.


// //DELETE 
// app.delete('/api/image/:id', db.image.deleteAllImages) - Deletes all images tied to a post.
// app.delete('/api/image/:id/:imid', db.image.deleteOneImage) - Deletes one image from a post.