const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // console.log('search term is', req.query.searchBy);
  let sqlText;
  if (req.query.searchBy == 'title'){
    sqlText = `SELECT "pins"."id", LOWER("title") AS "title", 
    LOWER("latin_name"), "date", "text_entry", 
    "lat", "lng", "img_url"
    FROM "pins"
    JOIN "images" ON images.id = pins.image_id
    WHERE LOWER("title") LIKE $1
    ;`;
  } else {
    sqlText = `SELECT "pins"."id", LOWER("title") AS "title", 
    LOWER("latin_name") AS "latin_name", "date", "text_entry", 
    "lat", "lng", "img_url"
    FROM "pins"
    JOIN "images" ON images.id = pins.image_id
    WHERE LOWER("latin_name") LIKE $1
    ;`;
  }
    const sqlParams = [`%`+req.query.searchTerm+`%`];
  pool.query(sqlText, sqlParams)
    .then(result => {
      // console.log('query is:', sqlParams, 'query result is', result.rows);
      res.send(result.rows);
    }).catch(err => {
      console.error('error in search',err);
      res.sendStatus(500);
    });
})

module.exports = router;
