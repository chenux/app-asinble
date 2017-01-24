
var compression = require('compression')
var express = require('express');
var express = require('http');
//var browserify = require('browserify');
//var React = require('react');
//var ReactDOM = require('react-dom/server');

//var jsx = require('node-jsx');


var app = express();


//jsx.install();

var Home = require('./src/home.jsx');

app.use(compression());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.end(

  	ReactDOM.renderToStaticMarkup(
  		React.createElement(Home)
  	)

  );
});


var server = app.listen(3000, function() {
	var addr = server.address();
	console.log('Listening @ http://%s:%d', addr.address, addr.port);
})