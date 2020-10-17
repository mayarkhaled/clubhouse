var express = require('express');
var router = express.Router();
var posts = require('../controllers/postController')
/* GET home page. */
router.get('/', function(req, res, next) {
  posts.home(req , res , next);
});

module.exports = router;
