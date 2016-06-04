var smashingMarkup = require('./index');
var express = require('express');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var app = express();

app.use(express.static("./public"));
// app.get('/', function(req, res){
//   // res.sendfile('./public/index.html');
// });


// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });

// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });


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
console.log("Express app running on port 3000");

module.exports = app;