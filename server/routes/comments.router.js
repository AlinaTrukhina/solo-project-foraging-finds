const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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
      console.log('get all comments failed', err);
      res.sendStatus(500);
    });
});


/**
 * POST route to post one comment to database
 */
router.post('/', rejectUnauthenticated, (req, res) => {
console.log('in POST route to add comment');
const sqlText = `
    INSERT INTO "comments" (comment, date, user_id, pin_id)
    VALUES ($1, $2, $3, $4)
  ;`;

const sqlParams = [req.body.comment, req.body.date, req.body.user_id, req.body.pin_id];

pool.query(sqlText, sqlParams)
  .then(dbResponse => {
    console.log('commment added');
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('post comment failed', err);
    res.sendStatus(500);
  });
})

module.exports = router;
