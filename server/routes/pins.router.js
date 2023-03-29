const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all pins from database
router.get('/', (req, res) => {
  // sql query:
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
      console.error('get all pins failed', err);
      res.sendStatus(500);
    });
});


// get selected pin
router.get('/:id', (req, res) => { 
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
      res.send(dbResponse.rows[0]);
    })
    .catch((err) => {
      console.error('get selected pin failed', err);
      res.sendStatus(500);
    });
})

module.exports = router;