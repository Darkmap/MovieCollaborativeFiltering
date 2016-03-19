/**
 * Created by qixuanwang on 16/3/18.
 */

var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var movieSchema = new Schema(
    {
        id: { type: Number, index: true },
        name : String,
        types : [String]
    }
);

mongoose.model('Movie', movieSchema);
var Movie = mongoose.model('Movie');


function add(movie) {

    movie.save(function(err){
        if(err){
            util.log("FATAL"+err);
        }
    });
};

function findAll(operation){
    Movie.find({}, function (err, movies){
        if(err){
            return console.error(err);
        }
        operation(movies);
    });
}

exports.schema = movieSchema;
exports.model = Movie;
exports.add = add;
exports.findAll = findAll;

//exports.findById = function(id,callback){
//    Movie.findOne({'id': id},function(err,doc){
//        if (err) {
//            util.log('FATAL '+ err);
//        }
//        callback(null, doc);
//    });
//};

//exports.delete = function(id, callback) {
//    exports.findById(id, function(err, doc) {
//        if (err)
//            callback(err);
//        else {
//            util.log(util.inspect(doc));
//            doc.remove();
//            callback(null);
//        }
//    });
//};