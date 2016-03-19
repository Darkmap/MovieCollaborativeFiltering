/**
 * Created by qixuanwang on 16/3/18.
 */

var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema(
    {
        userId: { type: Number, index: true },
        movieId : { type: Number, index: true },
        rating : Number,
        timeStamp : Date
    }
);

mongoose.model('Rating', ratingSchema);
var Rating = mongoose.model('Rating');

function add(rating) {

    rating.save(function(err){
        if(err){
            util.log("FATAL"+err);
        }
    });
};

function findAll(operation){
    Rating.find({}, function (err, movies){
        if(err){
            return console.error(err);
        }
        operation(movies);
    });
}

function findByUserId(id, operation){
    Rating.find({'userId': id},function(err,ratings){
        if (err) {
            util.log('FATAL '+ err);
        }
        operation(ratings);
    });
};

function findByMovieId(movieId, operation){
    Rating.find({'movieId': movieId}, 'userId rating', function (err, ratings){
        if(err){
            return console.error(err);
        }
        operation(ratings);
    });
}

exports.schema = ratingSchema;
exports.model = Rating;
exports.add = add;
exports.findAll = findAll;
exports.findByMovieId = findByMovieId;
exports.findByUserId =  findByUserId;