const pool = require("./connect");


/**
 * A getPost function that gets all available post that were made by all users
 * This function queries the database to find out all avaialbe posts and outputs
 * them into the market place  
 * @param {JSON} req 
 * @param {JSON} res 
 */
const getPost = (req, res) => {
  let posts = [];
  let length;

  pool.query('SELECT * FROM "tbl_Post" ORDER BY timestamp DESC', (err, results) => {
    if (err) throw err;
    length = results.rows.length;
    if (length == 0)
      res.status(400).json(posts);
    else {
      for (let i = 0; i < results.rows.length; i++) {
        let row = results.rows[i];
        pool.query('SELECT "accountID", "name", "phone", "rating", "totalNumRatings" FROM "tbl_Account" WHERE "accountID" = $1', [row.accountID], (err, results) => {
          if (err) throw err;
          row.user = results.rows[0];
          row.images = [];

          pool.query('SELECT "url" FROM "tbl_Images" WHERE "postID" = $1', [row.postID], (err, results) => {
            if (err) throw err;
            results.rows.forEach(image => { row.images.push(image.url) });

            if (req.query.title === undefined || row.title.toLowerCase().includes(req.query.title.toLowerCase())){
              posts.push(row);
            }
            else {
              length--;
            }
            if (posts.length === length) {
              res.status(418).json(posts);
            }
          })
        })
      }
    }
  })
};


/**
 * The function getOnePost queries the database and gets the post from the PostID that
 * URL endpoint. This would output the post that corresponds to the specific postID
 * @param {JSON} req 
 * @param {JSON} res 
 */
const getOnePost = (req, res) => {
  let post = {};
  const postID = parseInt(req.params.pid);
  pool.query('SELECT * FROM "tbl_Post" WHERE "postID" = $1', [postID], (err, results) => {
    if (err) throw err;
    length = results.rows.length;

    if (length == 0)
      return res.status(400).json(post);
    else {
      post = results.rows[0];

      pool.query('SELECT "accountID", "name", "phone", "rating", "totalNumRatings" FROM "tbl_Account" WHERE "accountID" = $1', [post.accountID], (err, results) => {
        if (err) throw err;
        post.user = results.rows[0];
        post.images = [];

        pool.query('SELECT "url" FROM "tbl_Images" WHERE "postID" = $1', [post.postID], (err, results) => {
          if (err) throw err;
          results.rows.forEach(image => { post.images.push(image.url) });
          res.status(418).json(post);
        })
      })
    }
  })
}

//   pool.any('SELECT * FROM "tbl_Post" WHERE "postID" = $1', [postID])
//     .then(data => {
//       const length = data.length;
//       if (length == 0)
//       {
//         res.status(400).json(post);
//       }
//       else
//       {
//         post = data;
//         console.log(post);
//         res.status(400).json(post);
//       }
//     })
//     .catch(error => {
//       return next(error);
//     });

/**
 * The getOneAccountPost function gets all the post that was made by one specific account. 
 * The URL endpoint requires the accountID and will output all posts that corresponds to that one 
 * specific accountID.
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
              results.rows.forEach(image => { row.images.push(image.url) });
              posts.push(row);
              if (posts.length == length) {
                res.status(418).json(posts);
              }
            })
          }
        );
      });
    }
  );
};

/**
 * The function createPost will take in the JSON string that is required by creation of post and store it. 
 * req will then make use of the inputs and do an INSERT query into the table "tbl_Post" to perform the creation
 * of the post. The response paramater, res, will output the inputs that were inserted into the Tbl_Post.
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
      "Pending Offer",
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
        res.status(418).json(msg);
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
                res.status(418).json(msg);
              }
            }
          );
        });
      }
    }
  );
};

/**
 * The function completePost will take in the parameter of postID from req and make use of the value to do 
 * an UPDATE query to the specific post to change its status to "Service Completed".
 * @param {JSON} req 
 * @param {JSON} res 
 */
const completePost = (req, res) => {
  const postID = parseInt(req.params.pid);

  pool.query('UPDATE "tbl_Post" SET "status" = $1 WHERE "postID" = $2 RETURNING *', ["Service Completed", postID], (err, results) => {
    if (err) throw err;
    res.status(418).json(results.rows[0]);
  })
}

/**
 * The function updatePost will take in the inputs that are required by the table in database
 * and change all the current available values to the newly inserted inputs. The "UPDATE" query 
 * will be called in the function to insert the newly inserted inputs and update current available 
 * inputs in the database tbl_Post.
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
    service,
    accountID
  } = req.body;

  pool.connect(function (error, client, done) {
    if (error) {
      console.error('error', error.stack);
      return console.error('Could not connect to pgsql server', error);
    }

    client.query('BEGIN', function (error) {
      console.log('BEGIN');
      if (error) {
        console.error('error', error.stack);
        console.error('Problem starting transaction', error);
        return done(true);
      }

      client.query('UPDATE "tbl_Post" SET "status" = $1, "title" = $2, "description" = $3, "location" = $4, "startDate" = $5, "endDate" = $6, "timestamp" = current_timestamp, "typeOfPet" = $7, "service" = $8 WHERE "accountID" = $9 AND "postID" = $10 RETURNING *;',
        [status, title, description, location, startDate, endDate, typeOfPet, service, accountID, postID],
        function (error, result) {
          console.log('running update query')
          if (error) {
            console.error('Unable to update data, rolling back transaction', error);
            return client.query('ROLLBACK', function (error) {
              if (error) {
                console.error('Unable to rollback transaction, killing client', error);
              }
              done(error);
            });
          }

          client.query('COMMIT', function (error) {
            console.log('running COMMIT')
            if (error) {
              console.error('Unable to commit transaction, killing client', error);
            }
            done(error);
            res.status(418).json(result.rows[0]);
            console.log('update finish')
          })
        })
    })
  })
}

// const updatePost = (req, res) => {
//   const postID = parseInt(req.params.pid);

//   const {
//     status,
//     title,
//     description,
//     location,
//     startDate,
//     endDate,
//     typeOfPet,
//     service,
//     accountID
//   } = req.body;

//   pool.query(
//     'UPDATE "tbl_Post" SET "status" = $1, "title" = $2, "description" = $3, "location" = $4, "startDate" = $5, "endDate" = $6, "timestamp" = current_timestamp, "typeOfPet" = $7, "service" = $8 WHERE "accountID" = $9 AND "postID" = $10 RETURNING *;',
//     [
//       status,
//       title,
//       description,
//       location,
//       startDate,
//       endDate,
//       typeOfPet,
//       service,
//       accountID,
//       postID
//     ],
//     (error, results) => {
//       if (error) throw error;
//       console.log(results.rows[0])
//       res.status(201).json(results.rows[0]);
//     }
//   );
// };

/**
 * The function deletePost will take in the parameters PostID and remove the specific postID from the tbl_Post in 
 * database. A "DELETE" query will be performed based on the postID that is available from the parameter req, and it
 * find the corresponding postID in the database and delete it accordingly.
 * @param {*} req 
 * @param {*} res 
 */
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

          res.status(418).send(`PostID of ${postID}`);
        }
      );
    }
  );

  pool.query(
    'DELETE FROM "tbl_Offers" WHERE "postID" = $1',
    [postID],
    (error, results) => {
      if (error) throw error;
    }
  );
};

module.exports = {
  getPost,
  getOnePost,
  getOneAccountPost,
  createPost,
  completePost,
  updatePost,
  deletePost
};