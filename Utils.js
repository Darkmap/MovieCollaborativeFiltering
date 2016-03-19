/**
 * Created by qixuanwang on 16/3/19.
 */

function pearsonCorrelation(vector1, vector2){

    var keys = [];
    var sum1 = 0;
    var sum2 = 0;
    for(var key in vector1){
        if(vector1.hasOwnProperty(key) && vector2.hasOwnProperty(key)){
            keys.push(key);
            sum1 += vector1[key];
            sum2 += vector2[key];
        }
    }

    var mean1 = sum1 / (keys.length);
    var mean2 = sum2 / (keys.length);

    var numerator = 0;
    var denominator1 = 0;
    var denominator2 = 0;

    for(var idx in keys){
        var x = keys[idx];

        numerator += (vector1[x]-mean1)*(vector2[x]-mean2);
        denominator1 += Math.pow((vector1[x]-mean1),2);
        denominator2 += Math.pow((vector2[x]-mean2),2);
    }

    return numerator / Math.sqrt(denominator1 * denominator2);
}

function vectorMean(vector){
    var sum = 0;
    var count = 0;
    for(var key in vector){
        if(vector.hasOwnProperty(key)){
            sum += vector[key];
            count++;
        }
    }
    return sum/count;
}



exports.pearsonCorrelation = pearsonCorrelation;