let express = require('express');
let path = require('path');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/www/dist/index.html'));
});

module.exports = router;
