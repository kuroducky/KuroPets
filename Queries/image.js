const pool = require('./connect')

const getImages = (req, res) =>
{
    const postID = parseInt(req.params.pid)

    pool.query('SELECT * FROM "tbl_Images" WHERE "postID" = $1;', [postID], (error,results) =>
    {
        if(error)
            throw error;
        res.status(200).json(results.rows);
    })
}

const getOneImage = (req, res) =>
{
    const postID = parseInt(req.params.pid)
    const imageID = parseInt(req.params.imid)

    pool.query('SELECT * FROM "tbl_Images" WHERE "postID" = $1 AND "imageID" =$2;', [postID, imageID], (error,results) =>
    {
        if(error)
            throw error;
        res.status(200).json(results.rows);
    })
}


const postImage = (req,res) =>
{
    const {imageURL} = req.body;
    const postID = req.params.pid;

    pool.query('INSERT INTO "tbl_Images" ("imageURL","postID") VALUES ($1,$2) RETURNING *; ', [imageURL,postID], (error,results) =>
    {
        if (error)
            throw error;
        res.status(201).send(`Image has been posted to postID = ${postID}`);
    })
}



const updateImage = (req,res) =>
{
    const postID = parseInt(req.params.pid);
    const imageID = parseInt(req.params.imid);

    const {imageURL} = req.body;

    pool.query('UPDATE "tbl_Images" SET "imageURL" = $1 WHERE ("postID" = $2 AND "imageID" = $3 )', [imageURL, postID, imageID], (error,results) =>
    {
        if (error)
            throw error;
        res.status(201).send(`Image has been updated in postID = ${postID}`);
    })
}

const deleteAllImages = (req,res) =>
{
    const postID = parseInt(req.params.pid);

    pool.query('DELETE FROM "tbl_Images" WHERE "postID" = $1', [postID], (error,results) =>
    {
        if (error)
            throw error;
        res.status(201).send(`All images have been removed from in postID = ${postID}`);
    })
}

const deleteOneImage = (req,res) =>
{
    const postID = parseInt(req.params.pid);
    const imageID = parseInt(req.params.imid);

    pool.query('DELETE FROM "tbl_Images" WHERE "postID" = $1 AND "imageID" = $2', [postID, imageID], (error,results) =>
    {
        if (error)
            throw error;
        res.status(201).send(`ImageID ${imageID} have been removed from in postID = ${postID}`);
    })
}


module.exports = {
    getImages,
    getOneImage,
    postImage,
    updateImage,
    deleteAllImages,
    deleteOneImage
}
