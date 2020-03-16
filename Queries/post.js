const pool = require("./connect");

const getPost = (req, res) => {
  let posts = [];
  let length;

  pool.query('SELECT * FROM "tbl_Post"', (err, results) => {
    if (err) throw err;
    length = results.rows.length;

    if (length == 0)
      res.status(400).json(posts);
    else {
      results.rows.forEach(row => {
        pool.query('SELECT "accountID", "name", "phone", "rating", "totalNumRatings" FROM "tbl_Account" WHERE "accountID" = $1', [row.accountID], (err, results) => {
          if (err) throw err;
          row.user = results.rows[0];
          row.images = [];

          pool.query('SELECT "url" FROM "tbl_Images" WHERE "postID" = $1', [row.postID], (err, results) => {
            if (err) throw err;
            results.rows.forEach(image => { row.images.push(image.url) });
            posts.push(row);
            if (posts.length == length) {
              res.status(200).json(posts);
            }
          })
        })
      })
    }
  })
};

const getOnePost = (req, res) => {
  const postID = parseInt(req.params.pid);
  let post = {};

  pool.query('SELECT * FROM "tbl_Post" WHERE "postID" = $1', [postID], (err, results) => {
    if (err) throw err;
    length = results.rows.length;

    if (length == 0)
      res.status(400).json(post);
    else {
      post = results.rows[0];

      pool.query('SELECT "accountID", "name", "phone", "rating", "totalNumRatings" FROM "tbl_Account" WHERE "accountID" = $1', [post.accountID], (err, results) => {
        if (err) throw err;
        post.user = results.rows[0];
        post.images = [];

        pool.query('SELECT "url" FROM "tbl_Images" WHERE "postID" = $1', [post.postID], (err, results) => {
          if (err) throw err;
          results.rows.forEach(image => { post.images.push(image.url) });
          res.status(200).json(post);
        })
      })
    }
  })
}

const getOneAccountPost = (req, res) => {
  const accountID = parseInt(req.params.aid);
  let posts = [];
  let length;

  pool.query(
    'SELECT * FROM "tbl_Post" WHERE "accountID" = $1',
    [accountID],
    (error, results) => {
      if (error) {
        throw error;
      }
      length = results.rows.length;
      results.rows.forEach(row => {
        pool.query(
          'SELECT "accountID", "name", "phone", "rating", "totalNumRatings" FROM "tbl_Account" WHERE "accountID" = $1;',
          [accountID],
          (error, results) => {
            if (error) throw error;
            
            row.user = results.rows[0];
            row.images = [];
            pool.query('SELECT "url" FROM "tbl_Images" WHERE "postID" = $1', [row.postID], (err, results) => {
              if (err) throw err;
              results.rows.forEach(image => {row.images.push(image.url)});
              posts.push(row);
              if (posts.length == length){
                res.status(200).json(posts);
              }
            })
          }
        );
      });
    }
  );
};

const createPost = (req, res) => {
  const {
    title,
    description,
    location,
    startDate,
    endDate,
    typeOfPet,
    service,
    accountID
  } = req.body;
  pool.query(
    'INSERT INTO "tbl_Post"("status", "title", "description", "location", "startDate", "endDate", "timestamp", "typeOfPet", "service", "accountID") VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, $7, $8, $9) RETURNING *;',
    [
      "Pending Service",
      title,
      description,
      location,
      startDate,
      endDate,
      typeOfPet,
      service,
      accountID
    ],
    (error, results) => {
      if (error) throw error;

      var images = req.body.images;
      var msg = results.rows[0];
      msg.images = [];
      if (images === undefined || images.length == 0) {
        res.status(200).json(msg);
      } else {
        var postID = msg.postID;
        var imageTotal = images.length;
        var count = 0;

        images.forEach(url => {
          pool.query(
            'INSERT INTO "tbl_Images" ("url","postID") VALUES ($1,$2) RETURNING *; ',
            [url, postID],
            (error, imgResults) => {
              if (error) throw error;

              count++;
              msg.images.push(url);
              if (count == imageTotal) {
                res.status(200).json(msg);
              }
            }
          );
        });
      }
    }
  );
};

const updatePost = (req, res) => {
  const postID = parseInt(req.params.pid);

  const {
    status,
    title,
    description,
    location,
    startDate,
    endDate,
    typeOfPet,
    service
  } = req.body;

  pool.query(
    'UPDATE "tbl_Post" SET "status" = $1, "title" = $2, "description" = $3, "location" = $4, "startDate" = $5, "endDate" = $6, "timestamp" = current_timestamp, "typeOfPet" = $7, "service" = $8 WHERE "accountID" = $9 AND "postID" = $10 RETURNING *;',
    [
      status,
      title,
      description,
      location,
      startDate,
      endDate,
      typeOfPet,
      service,
      accountID,
      postID
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).json(results.rows[0]);
    }
  );
};

const deletePost = (req, res) => {
  const postID = parseInt(req.params.pid);

  pool.query(
    'DELETE FROM "tbl_Post" WHERE "postID" = $1;',
    [postID],
    (error, results) => {
      if (error) {
        throw error;
      }

      pool.query(
        'DELETE FROM "tbl_Images" WHERE "postID" = $1',
        [postID],
        (error, results) => {
          if (error) throw error;

          res.status(200).send(`PostID of ${postID}`);
        }
      );
    }
  );
};

module.exports = {
  getPost,
  getOnePost,
  getOneAccountPost,
  createPost,
  updatePost,
  deletePost
};