var fs = require('fs');
var Q = require('q');

var cp = require('child_process');
var pandocPath = require('pandoc-bin').path;

module.exports.mdToHtml = function (input, callback) {

    var deferred = Q.defer();

    var pandoc = cp.spawn(pandocPath, ['--from=markdown', '--to=html', '--template=smashingtemplate']);
    pandoc.stdin.write(input);
    var result = '';
    pandoc.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
        result += data.toString();
    });
    pandoc.stdin.end();
    pandoc.on('close', function(){
        deferred.promise.nodeify(callback);
        deferred.resolve(result);
    });

    return deferred.promise;

}


function replaceImgsWithFigures(inputString) {
    search = /<div class="figure">\n(<img .* \/>)\n<p class="caption">(.*)<\/p>\n<\/div>/;
    replace = `<figure>$1<figcaption>$2</figcaption></figure>`;
    output = inputString.replace(search, replace);
    return output;
}
