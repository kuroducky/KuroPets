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
            res.status(201).json(result.rows[0]);
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
  updatePost,
  deletePost
};