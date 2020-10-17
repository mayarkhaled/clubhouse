const { body,validationResult } = require("express-validator");
const User = require('../models/user');
const post = require('../models/post');
let currentUser = new User();

exports.home = function(req , res , next){
    currentUser = res.locals.currentUser;
    //get all posts
    post.find({}).populate('user')
        .exec(function(err , list_posts){
            if(err)
                next(err);
            res.render('home' , {user : currentUser , posts : list_posts})    
        });
}

exports.membership = function(req , res ){
   res.render('membership',{});
}
exports.verifyMembership = function(req , res ){
   if(req.body.secretcode == 'mayar'){
      update_membership();
    res.redirect('/home');
 }

}

exports.newpost_get = function(req , res ){
    res.render('newpost')
}
exports.newpost_post = [
    body('post' , "Message cannot be empty").trim().isLength({min:1}),
    (req , res , next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('newpost' , {error : errors.array()});
            return;
        }
        let new_post = new post({
            message : req.body.post,
            user : currentUser
        });
        new_post.save(function(err){
            if(err) return next(err);
            res.redirect('/home');
        })
    }
]

async function update_membership(){
    const filter = {email : currentUser.email};
    const query = {$set :{
        member : true
    }};
    const result = await User.updateOne(filter , query );
    return result;
}