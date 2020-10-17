var express = require('express');
var router = express.Router();
var postControllers = require('../controllers/postController');

router.get('/' , postControllers.home);
router.get('/membership' , postControllers.membership);
router.post('/membership' , postControllers.verifyMembership);

router.get('/newpost' , postControllers.newpost_get);
router.post('/newpost' , postControllers.newpost_post);

module.exports = router;