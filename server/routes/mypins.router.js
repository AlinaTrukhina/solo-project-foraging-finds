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
  ;`;
  pool
    .query(sqlText, sqlParams)
    .then(dbResponse=> {
      res.send(dbResponse.rows)
    })
    .catch((err) => {
      console.log('get all pins failed', err);
      res.sendStatus(500);
    });
});

module.exports = router;
