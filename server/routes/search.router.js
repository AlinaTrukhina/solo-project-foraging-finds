const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('search term is', req.body.searchTerm);
  const sqlText = `SELECT "pins"."id", LOWER("title"), 
  LOWER("latin_name"), "date", "text_entry", 
  "lat", "lng", "img_url"
  FROM "pins"
  JOIN "images" ON images.id = pins.image_id
  WHERE LOWER("title") LIKE %$1%
  ;`;
  const sqlParams = [req.body.searchTerm];
  pool.query(sqlText, sqlParams)
    .then(result => {
      console.log('query result is', result.rows);
      res.send(result.rows);
    }).catch(err => {
      console.log('error in search',err);
      res.sendStatus(500);
    });
})

module.exports = router;
