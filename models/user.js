var mongoose = require('mongoose');
var schema = mongoose.Schema;

var user_schema = new schema({
    email : {type:String , required : true },
    fullname : {type : String , required : true},
    password : {type : String , minlength : 5 , required : true},
    member : {type:Boolean }
});

user_schema.virtual('url').get(function(){
    return 'home/user/'+this._id;
});

module.exports = mongoose.model('user' , user_schema);