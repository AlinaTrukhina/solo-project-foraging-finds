const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET all user's pins from database
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  sqlParams = [req.user.id];
  // GET route code here
  const sqlText = `SELECT "pins"."id", "title", "latin_name", "date", "text_entry", "lat", "lng", "img_url", "user_id"
  FROM "pins"
  JOIN "images" ON images.id = pins.image_id
  JOIN "user" ON user_id = "user".id
  WHERE "user"."id" = $1
  ORDER BY pins ASC
  ;`;
  pool
    .query(sqlText, sqlParams)
    .then(dbResponse=> {
      res.send(dbResponse.rows)
    })
    .catch((err) => {
      console.error('get all pins failed', err);
      res.sendStatus(500);
    });
});

// add pin
router.post('/', rejectUnauthenticated, (req, res) => {
  
  const sqlTextPin = `INSERT INTO "pins" (
    "title", "latin_name", 
    "date", "image_id", "text_entry", 
    "user_id", "lat", "lng")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ;`;

  const sqlParamsPin = [req.body.title, req.body.latin_name, req.body.date, 
    req.body.img_id, req.body.text_entry, req.user.id, 
    req.body.lat, req.body.lng];

    pool.query(sqlTextPin, sqlParamsPin)
          .then(result => {
            res.sendStatus(201);
          }).catch(err => {
            // catch for second query
            console.error('error in second adding pin query',err);
            res.sendStatus(500);
          });
});

// delete a pin if user is logged in
router.delete('/', rejectUnauthenticated, (req, res) => {
  // console.log('delete request for pin', req.body.id);
  const sqlDeleteParams = [req.body.id];
  const sqlDeleteCommentsText = `DELETE FROM "comments"
  WHERE pin_id = $1;` ;

  pool.query(sqlDeleteCommentsText, sqlDeleteParams)
  .then(response => {
    const sqlDeleteText = `DELETE FROM "pins" 
    WHERE pins.id= $1 AND user_id = $2 ;`;
    const sqlDeleteParams = [req.body.id, req.user.id];

    pool.query(sqlDeleteText, sqlDeleteParams)
    .then(response => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error('error deleting pin');
      res.sendStatus(500);
    })
  })
  .catch(err => {
    // catch for delete pin
    console.error('error deleting pin comments', err);
    res.sendStatus(500);
  });
});

// get pin to edit
router.get('/:id', rejectUnauthenticated, (req, res) => { 
  sqlParams = [req.params.id];
  // GET route code here
  const sqlText = `SELECT "pins"."id", "title", "latin_name", "date", "text_entry", "lat", "lng", "img_url", "user_id"
  FROM "pins"
  JOIN "images" ON images.id = pins.image_id
  WHERE "pins"."id" = $1
  ;`;
  pool
    .query(sqlText, sqlParams)
    .then(dbResponse=> {
      res.send(dbResponse.rows[0])
    })
    .catch((err) => {
      console.error('get pin to edit failed', err);
      res.sendStatus(500);
    });
})

// edit pin if user is logged in
router.put('/:id/edit', rejectUnauthenticated, (req, res) => {
  const sqlEditText =`
  UPDATE "pins"
  SET "title" = $2, "latin_name" = $3, "text_entry" = $4
  WHERE pins.id = $1
  ;
  `;
  const sqlEditParams = [req.params.id, req.body.title, req.body.latin_name, req.body.text_entry]

  pool.query(sqlEditText, sqlEditParams)
  .then(dBres => {
    res.sendStatus(200);
  })
  .catch(err => {
    // catch for delete pin
    console.error('error editing pin', err);
    res.sendStatus(500);
  })
});

module.exports = router;
