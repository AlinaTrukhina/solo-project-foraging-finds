const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// set up storage folder for image upload with file name
const storage = multer.diskStorage({
  destination: 'public/images/' ,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// initialize "upload" variable
const upload = multer({
  storage: storage,
  limits: {filesize: 10000000}
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, upload.single('uploaded_file'), function (req, res, err) {
  // add the image to image table
  const sqlTextImage = `INSERT INTO "images" ("img_url")
    VALUES ($1)
    RETURNING id
    ;`;
  
  sqlParams = [`/images/` + req.file.filename];
  console.log(sqlParams);
  pool.query(sqlTextImage, sqlParams)
  .then(result => {
    console.log(result.rows);
    // res.send(result.rows);
    res.sendStatus(201);
  }).catch(err => {
    console.error('error in posting image', err);
    res.sendStatus(500);
  });
  
});

// use async/await instead of .then.catch for practice
router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    let dbRes = await pool.query(`SELECT * FROM images 
    ORDER BY ID DESC
    LIMIT 1;
    `);

    res.send(dbRes.rows[0]);
  }
  catch (err) {
    console.error('error in GET for last image');
    res.sendStatus(500);
  }
})

module.exports = router;