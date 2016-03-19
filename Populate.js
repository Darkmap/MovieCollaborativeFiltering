/**
 * Created by qixuanwang on 16/3/18.
 */
var dburl = require('./configs').dburl;
var mongoose = require('mongoose');

var readData = require('./ReadData').readData;
var movieApt = require('./ReadData').toMovie;
var ratingApt = require('./ReadData').toRating;
var userApt = require('./ReadData').toUser;


//var readData2 = require('./ReadData').readData2;
//var ratingApt2 = require('./ReadData').toRating2;

var movieDao = require('./Movies');
var ratingDao = require('./Ratings');
var userDao = require('./Users');


//mongoose.connect(dburl);
//readData('data/users.dat', userDao, userApt);
//readData('data/movies.dat', movieDao, movieApt);
//readData2('data/ratings.dat', ratingDao, ratingApt2);
//mongoose.disconnect();