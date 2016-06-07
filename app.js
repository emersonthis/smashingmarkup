var smashingMarkup = require('./index');
var express = require('express');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var app = express();

app.use(function(req, res, next){
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.static("./public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.listen(process.env.PORT || 3000);
app.post("/convert", function(req, res){
    
    smashingMarkup.mdToHtml(req.body.markdown)
        .then( function(html){
            responseData = { markup : html};
            res.json(responseData);
        });
});
var port = process.env.PORT || 3000;
console.log(`Express app running on port ${port}`);

module.exports = app;