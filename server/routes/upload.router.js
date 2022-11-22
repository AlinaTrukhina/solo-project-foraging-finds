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

  const sqlTextImage = `INSERT INTO "images" ("img_url")
  VALUES ($1)
  RETURNING "id"
  ;`;
  
  sqlParams = [`public/upload/`+ req.filename]

  pool.query(sqlText, sqlParams)
  // POST route code here
  res.send('test', filename);
  // }).catch(err => {
  //   // catch for second query
  //   console.log('error in first adding pin query', err);
  //   res.sendStatus(500);
  // });
  
});

module.exports = router;