//models
var user = require('../models/user');
//validator
const { body,validationResult , check} = require("express-validator");
//bcrypt
const bcrypt = require('bcryptjs');

exports.signup_get = function(req , res ){
    res.render('signup' , {title : 'Create new account '});
}

exports.signup_post = [
    //validate and sanatize

    body('fullname' , 'fullname is required').trim().isLength({min : 1}).escape(),

    check('email').normalizeEmail().isEmail().withMessage('enter a valid email')
                  .trim().isLength({min : 1}).withMessage('email is required').escape(),

    check('password').exists(),
    check('confirmpass' , 'passwords do not match ').exists()
                 .custom(( value,{req} ) => value === req.body.password),   

    (req , res , next ) => {
        //check if user already exists
        checkIfUserExists(req , res , next);

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('signup', { title: 'Create new account', errors: errors.array()});
            return;
        }

        let new_user = undefined;
         bcrypt.hash(req.body.confirmpass , 10 , (err , hashed_password) =>{
             new_user = new user({
                email : req.body.email,
                password : hashed_password,
                fullname : req.body.fullname,
                member : false
            });
            new_user.save(err => {
                if(err){
                    return next(err);
                }
                res.redirect('/');  })
        });
    }    
]

exports.login_get = function(req , res ){
    res.render('login' , {title : "Log-in"})
}

exports.login_post = [
     //validate email
  check('email').normalizeEmail().isEmail().withMessage('enter a valid email')
  .trim().isLength({min : 1}).withMessage('email is required').escape(),

  check('password').exists()
    
]

exports.log_out = function(req , res ){
    req.logout();
    res.redirect('/home');
}

function checkIfUserExists(req , res , next){
    user.findOne({email : req.body.email}).exec(function(err , user_found){
        if(err)
          return next(err);
        if(user_found){
            res.redirect('/');
        }
    });
}