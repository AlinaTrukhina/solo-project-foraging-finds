const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { response } = require('express');

/**
 * GET all pins from database
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT "pins"."id", "title", "latin_name", "date", "text_entry", "lat", "lng", "img_url"
  FROM "pins"
  JOIN "images" ON images.id = pins.image_id
  ORDER BY pins ASC
  ;`;
  pool
    .query(sqlText)
    .then(dbResponse=> {
      res.send(dbResponse.rows)
    })
    .catch((err) => {
      console.log('get all pins failed', err);
      res.sendStatus(500);
    });
});

/**
 * POST route to add pin
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  
    const sqlTextImage = `INSERT INTO "images" ("img_url")
      VALUES ($1)
      RETURNING "id"
      ;`;

    pool.query(sqlTextImage, [req.body.img_url])
      .then(response => {
        console.log('new img id:', response.rows[0].id);
        const newImgId = response.rows[0].id;
        
        const sqlTextPin = `INSERT INTO "pins" (
          "title", "latin_name", 
          "date", "image_id", "text_entry", 
          "user_id", "lat", "lng")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ;`;

        const sqlParamsPin = [req.body.title, req.body.latin_name, req.body.date, newImgId,
          req.body.text_entry, req.user.id, req.body.lat, req.body.lng];
        // second query to add pin
        pool.query(sqlTextPin, sqlParamsPin)
          .then(result => {
            // send status: 'created' when both queries are done
            res.sendStatus(201);
          }).catch(err => {
            // catch for second query
            console.log('error in second adding pin query',err);
            res.sendStatus(500);
          })
      }).catch(err => {
        // catch for second query
        console.log('error in first adding pin query', err);
        res.sendStatus(500);
      })
});


module.exports = router;