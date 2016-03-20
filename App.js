/**
 * Created by qixuanwang on 16/3/18.
 */

var dburl = require('./configs').dburl;
var mongoose = require('mongoose');
var async = require("async");
var fs = require('fs');

var movieDao = require('./Movies');
var ratingDao = require('./Ratings');
var movieSimDao = require('./MovieSims');

var simFunc = require('./Utils').pearsonCorrelation;


var movieIds = [];
var movieRatings = {};


async.series([
        function(callback){
            mongoose.connect(dburl);
            callback(null, 'db_connected');
        },
        //function(callback){
        //    movieDao.findAll(function(docs){
        //        for(var key in docs){
        //            console.log('getMovieIds: '+docs[key].id);
        //            movieIds.push(docs[key].id);
        //        }
        //
        //        fs.writeFile('data/movieIds.json', JSON.stringify(movieIds), function(err) {
        //            if (err) {
        //                return console.error(err);
        //            }
        //            callback(null, 'step1: init movieIds and store it to movieIds.json');
        //        });
        //
        //    });
        //},
        //function(callback){
        //
        //    var count = 0;
        //
        //    for(var mkey in movieIds){
        //
        //        var movieId = movieIds[mkey];
        //        //To make sure the 'movieId' won't changed since the findByMovieId is asynchronous.
        //        var getRating = function(movieId){
        //            ratingDao.findByMovieId(movieId, function(ratings){
        //
        //                movieRatings[movieId+''] = {};
        //                for(var key in ratings){
        //                    movieRatings[movieId+''][ratings[key].userId+''] = ratings[key].rating;
        //                    //console.log('movieId: '+ movieId);
        //                    //console.log('   userId: ' + movieRatings[movieId+'']['userId']);
        //                    //console.log('   rating: ' + movieRatings[movieId+'']['rating']);
        //                }
        //
        //                //movieRatings[movieId+''] = ratings;
        //                count++;
        //                console.log('step2 count: '+count);
        //                if(count===movieIds.length){
        //                    callback(null, 'step2: retrieve ratings from db');
        //                }
        //            });
        //        };
        //
        //        getRating(movieId);
        //    }
        //},
        //function(callback){
        //
        //    console.log(movieRatings);
        //
        //    fs.writeFile('data/movieRatings.dat', JSON.stringify(movieRatings), function(err) {
        //        if (err) {
        //            return console.error(err);
        //        }
        //        callback(null, 'step3: store movieRatings to movieRatings.dat');
        //    });
        //},
        //function(callback){
        //
        //    fs.readFile('data/movieIds.json', function(err, ids) {
        //        if (err) {
        //            return console.error(err);
        //        }
        //        movieIds = JSON.parse(ids);
        //        // console.log(movieIds);
        //
        //        fs.readFile('data/movieRatings.dat', function(err, ratings) {
        //            if (err) {
        //                return console.error(err);
        //            }
        //            movieRatings = JSON.parse(ratings);
        //            // console.log(movieRatings);
        //            callback(null, 'step4: reStore movieIds and movieRatings from files');
        //        });
        //    });
        //}
        //,
        //function(callback){
        //
        //   //var writerStream = fs.createWriteStream('data/movieSims.json');
        //   //
        //   //writerStream.on('finish', function() {
        //   //    writerStream.end();
        //   //    console.log("写入完成。");
        //   //});
        //
        //   for(var i = 0; i<movieIds.length; i++){
        //       var mid1 = movieIds[i];
        //       for(var j=i+1;j<movieIds.length; j++){
        //           var mid2 = movieIds[j];
        //
        //           var sim = simFunc(movieRatings[mid1+''], movieRatings[mid2+'']);
        //           if(isNaN(sim))
        //               sim = 0;
        //           //var moveiSim = new movieSimDao.model();
        //           //moveiSim['movieId1'] = mid1;
        //           //moveiSim['movieId2'] = mid2;
        //           //moveiSim['similarity'] = sim;
        //
        //           //var movieSim = {};
        //           //movieSim['movieId1'] = mid1;
        //           //movieSim['movieId2'] = mid2;
        //           //movieSim['similarity'] = sim;
        //           // console.log(mid1+":"+mid2 + ' start.');
        //           fs.appendFileSync('data/movieSims.dat', mid1+":"+mid2+":"+sim+'\n');
        //           console.log(mid1+":"+mid2 + ' done.');
        //           //writerStream.write(JSON.stringify(movieSim),'UTF8');
        //           //movieSimDao.add(moveiSim);
        //       }
        //   }
        //   callback(null, 'step5: compute similarity and store them into the db.movieSims');
        //},
        function(callback){
            movieSimDao.findByMovieId(1, function(docs){
                docs.sort(function(a,b){
                    return b.similarity - a.similarity;
                });
                console.log(docs);
                callback(null,'step6: get all similar movies');
            });
        }
        ,
        function(callback){
            mongoose.disconnect();
            callback(null,'db_disconnected');
        }
    ],
    function(err, results){
        console.log(results);
    }
);
