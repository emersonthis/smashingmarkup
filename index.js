var pdc = require('pdc');
var path = require('path');
var fs = require('fs');
var Q = require('q');

// optional, if pandoc is not in PATH
pdc.path = path.resolve(__dirname +'/bin/pandoc/1.15.0.6/bin/pandoc');

console.log('pdc.path', pdc.path);

// var inputFilePath = process.argv[2];
// console.log(inputFilePath);
// var inputFile = fs.readFileSync(inputFilePath, 'utf8');

module.exports.mdToHtml = function (input, callback) {

    var deferred = Q.defer();

    console.log('input', input);
    //TEST
    pdc('## Emerson', 'markdown', 'html', ['--template=smashingtemplate'], function(err, result){
        console.log(result);
    });

    /*
    src is a string containing the entire source text, that shall be converted.
    from is a string containing the type of the source text (e.g. 'markdown').
    to is a string containing the type of the destination text (e.g. 'html').
    args [optional] is an array with additional command line flags (e.g. [ '-v' ] for pandoc's version).
    opts [optional] is an object with additional options for the process. See the Node.js docs.
    callback is a function that is called after parsing. It takes two arguments (err, result), where err is an error or null and result is a string containing the converted text.
     */
    // pdc(src, from, to, [args,] [opts,] callback);
    pdc(input, 'markdown', 'html', ['--template=smashingtemplate'], function(err, result) {
        if (err) {
            deferred.reject(err)
        }
        try {
            console.log('result', result);
            result = replaceImgsWithFigures(result);
        } catch(e) {
            console.log(e);
            deferred.reject(e)

        }
        deferred.promise.nodeify(callback);
        deferred.resolve(result);
    });

    return deferred.promise;

}


function replaceImgsWithFigures(inputString) {

    console.log('inputString', inputString);

    search = /<div class="figure">\n(<img .* \/>)\n<p class="caption">(.*)<\/p>\n<\/div>/;

    replace = `<figure>$1<figcaption>$2</figcaption></figure>`;

    output = inputString.replace(search, replace);
    return output;
}
