var express = require('express');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
//var wedeployMiddleware = require('wedeploy-middleware');
var WeDeploy = require('wedeploy');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


//CONFIG
app.use(express.static('public'));
app.use(function(err, req, res, next) {
	console.log(err);
	res.send(500);
});
app.use(favicon(__dirname + '/public/images/like.ico'));


/////////PUBLIC
//LOGIN
app.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/login.html'));
});

//youtube Service
app.get('/search/:tagId', function (req, res) {
	var YouTube = require('youtube-node');

	var youTube = new YouTube();

	youTube.setKey('AIzaSyAAICJFcbyuLR_FJOKNRYeE9zcEfS_5tZw');

	youTube.search(req.params.tagId, 15, function(error, result) {
	  if (error) {
	  }
	  else {
	   res.json(result);
	  }
	});

});

/////////PRIVATE

//var authMiddleware = wedeployMiddleware.auth({
//  url: 'auth.musicv.wedeploy.io',
//  redirect: '/login'
//});
//app.use(wedeployMiddleware.auth({url: 'auth.project.wedeploy.io'}));
app.get('/', function (req, res, next) {
	//console.log('User: ', res.locals.auth.currentUser);
	res.sendFile(path.join(__dirname + '/private/index.html'));
});


//LISTEN
app.listen(80, function () {

});



