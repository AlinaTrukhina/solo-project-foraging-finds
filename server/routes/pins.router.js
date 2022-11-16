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
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  res.sendStatus(201);
});

module.exports = router;
