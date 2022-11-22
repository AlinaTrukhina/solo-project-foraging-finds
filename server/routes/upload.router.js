const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const multer = require('multer');

// set up storage folder for image upload with file name
const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    (null, re);
  }
})

const upload = multer({
  storage: storage,
})

// router.get('/', (req, res) => {
  
// });

/**
 * POST route template
 */
router.post('/', upload.single('uploaded_file'), (req, res) => {
  // POST route code here
  console.log('req.file is', req.file);

  res.sendStatus(200);
});

module.exports = router;