var mongoose = require('mongoose');
const { DateTime } = require("luxon");
var schema = mongoose.Schema;

var post_schema = new schema({
    message : {type : String , required : true},
    timestamp : {type : Date , default : Date.now},
    user : {type :schema.Types.ObjectId , ref : 'user'}
});

post_schema.virtual('url').get(function(){
    return 'home/post/'+this._id;
});

post_schema.virtual('date').get(function(){
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);   
})
module.exports = mongoose.model('post' , post_schema);