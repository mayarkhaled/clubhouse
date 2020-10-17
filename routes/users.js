var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const passport = require('passport')

router.get('/signup' , userController.signup_get);
router.post('/signup' , userController.signup_post);

router.get('/login' , userController.login_get);

router.post("/login",[
  userController.login_post,
  
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
]);

router.get('/logout' , userController.log_out);

module.exports = router;
