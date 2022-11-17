const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all pins from database
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT "pins"."id", "title", "latin_name", "date", "text_entry", "lat", "lng", "img_url"
  FROM "pins"
  JOIN "location" ON location.id = pins.location_id
  JOIN "images" ON images.id = pins.image_id
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
router.post('/', (req, res) => {
  // POST route code here
  const sqlTextLocation = `INSERT INTO "location" ("lat", "lng")
    VALUES  ($1, $2)
    RETURNING "id"
    ;`;
  const sqlParamsLocation = [req.body.lat, req.body.lng];

  // first query to add location
  pool.query(sqlTextLocation, sqlParamsLocation)
  .then(dbResponse=> {
    console.log('new location id:', dbResponse.rows[0].id);

    const newLocationId = dbResponse.rows[0].id;

    // second query to add image url
    const sqlTextImage = `INSERT INTO "images" ("img_url")
      VALUES ($1),
      RETURNING "id"
      ;`;
    pool.query(sqlTextImage, [req.body.img_url])
      .then(response => {
        console.log('new location id:', response.rows[0].id);
        const newImgId = response.rows[0].id;
        
        const sqlTextPin = `INSERT INTO "pins" (
          "title", "latin_name", 
          "date", "image_id", "text_entry", 
          "user_id", "location_id")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ;`;

        const sqlParamsPin = [req.body.title, req.body.latin_name, req.body.date, newImgId,
          req.body.text_entry, req.user.id, newLocationId];
        // second query to add pin
        pool.query(sqlTextPin, sqlParamsPin)
          .then(result => {
            // send status: 'created' when both queries are done
            res.sendStatus(201);
          }).catch(err => {
            // catch for second query
            console.log(err);
            res.sendStatus(500);
          })
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500);
      })
    })
    .catch((err) => {
      console.log('add location failed', err);
      res.sendStatus(500);
    });

});

module.exports = router;
