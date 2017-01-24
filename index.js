
var compression = require('compression')
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(compression());


// app.get('/', function (req, res) {

// });

app.use(express.static('public'));


server.listen(3000, function() {
	var addr = server.address();
	console.log('Listening @ http://%s:%d', addr.address, addr.port);
})