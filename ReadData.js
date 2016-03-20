/**
 * Created by qixuanwang on 16/3/17.
 */
var fs = require('fs');
var lineReader = require('readline');

function dealOneMovie(line, dao){

    var tokens = line.split('::');

    var movie = new dao.model();

    movie['id'] = tokens[0];
    movie['name'] = tokens[1];
    movie['lowerName'] = tokens[1].toLowerCase();
    movie['types'] = [];

    var types = tokens[2].split('|');
    for(var key in types){
        movie['types'].push(types[key]);
    }

    return movie;
}

function dealOneRating(line, dao){

    var tokens = line.split('::');

    var rating = new dao.model();

    rating['userId'] = tokens[0];
    rating['movieId'] = tokens[1];
    rating['rating'] = tokens[2];
    rating['timeStamp'] = tokens[3];

    return rating;
}

function dealOneUser(line, dao){

    var tokens = line.split('::');

    var user = new dao.model();

    user['userId'] = tokens[0];
    user['gender'] = tokens[1];
    user['age'] = tokens[2];
    user['occupation'] = tokens[3];
    user['zipCode'] = tokens[4];

    return user;
}

//function dealOneRating2(line){
//
//    var tokens = line.split('::');
//
//    var rating = {};
//
//    rating['userId'] = tokens[0];
//    rating['movieId'] = tokens[1];
//    rating['rating'] = tokens[2];
//    rating['timeStamp'] = tokens[3];
//
//    return rating;
//}
//function processFile2(file, dao, adapter){
//    //fs.readFile(file, function (err, data) {
//    //    if (err) {
//    //        return console.error(err);
//    //    }
//    //    var lines = data.toString().split('\n');
//    //    for(var key in lines){
//    //        if(lines[key].length>0) {
//    //            dao.add(adapter(lines[key], dao));
//    //            //write('data/movie.json', adapter(lines[key], dao).toString());
//    //        }
//    //    }
//    //});
//
//    var saveLine = function(line){
//        write('data/ratings.json', JSON.stringify(adapter(line)));
//    };
//
//    doForLines(file, saveLine);
//}


function processFile(file, dao, adapter){
    //fs.readFile(file, function (err, data) {
    //    if (err) {
    //        return console.error(err);
    //    }
    //    var lines = data.toString().split('\n');
    //    for(var key in lines){
    //        if(lines[key].length>0) {
    //            dao.add(adapter(lines[key], dao));
    //            //write('data/movie.json', adapter(lines[key], dao).toString());
    //        }
    //    }
    //});

    var saveLine = function(line){
        dao.add(adapter(line, dao));
    };

    doForLines(file, saveLine);
}


function doForLines(file, operation){


    var reader = lineReader.createInterface({
        input: require('fs').createReadStream(file)
    });

    reader.on('line', function (line) {
        operation(line);
        //console.log('Line from file:', line);
    });
}

function write(file, data){
    fs.appendFile(file, data,  function(err) {
        if (err) {
            return console.error(err);
        }
    });
}

exports.toMovie = dealOneMovie;
exports.toRating = dealOneRating;
exports.toUser = dealOneUser;
exports.readData = processFile;


//exports.toRating2 = dealOneRating2;
//exports.readData2 = processFile2;

