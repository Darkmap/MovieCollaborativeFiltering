/**
 * Created by qixuanwang on 16/3/18.
 */

var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        userId: { type: Number, index: true },
        gender : String,
        age : Number,
        occupation : Number,
        zipCode : String
    }
);

mongoose.model('User', userSchema);
var User = mongoose.model('User');

function add(user) {

    user.save(function(err){
        if(err){
            util.log("FATAL"+err);
        }
    });
};

exports.schema = userSchema;
exports.model = User;
exports.add = add;