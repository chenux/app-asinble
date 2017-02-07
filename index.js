
var compression = require('compression')
var express = require('express');
var app = express();
var logger = require('morgan');
var server = require('http').Server(app);

var utils = require('./src/utils.js');
var spawn = require('child_process').spawn;
var entities = require("entities");

var io = require('socket.io')(server);


app.use(logger('dev'));
app.use(compression());
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug')

// Código.
var code = null;

app.get('/admin', function (req, res) {

	res.render('index', {
		'admin': true,
		'code': code
	});

});




app.get('/', function (req, res) {

	res.render('index', {
		'admin': false,
		'code': code
	});


});


io.on('connection', function(socket) {

	console.log('Alguien se ha conectado con Sockets');


	// Recibir y recibir código.
	socket.on('new-code', function(data) {

		code = data;
		//console.log(code);
		io.sockets.emit('update-code', code);

	});

	// Enviar y recibir el cursor.
	socket.on('new-cursor', function(cursor) {

		// console.log(cursor);
		io.sockets.emit('update-cursor', cursor);

	});

	// Enviar y recibir el cursor.
	socket.on('new-selection', function(selection) {

		// console.log(cursor);
		io.sockets.emit('update-selection', selection);

	});

	// Enviar y recibir el .
	socket.on('new-build', function(code) {

		utils.save_code(code);

		const gcc = spawn('clang++', [
			'./public/src/main.cpp',
			'-o',
			'./public/src/program'
		]);

		gcc.stderr.on('data', (data) => {
			console.log( String(data));
			//io.sockets.emit('update-stderr', data);
			io.sockets.emit('update-out',
				String(data)
			);


		});

		// gcc.stdout.on('data', (data) => {
		// 	console.log( String(data));
		// });


		gcc.on('close', (code) => {

			if (code == 0) {

				console.log('Sin errores');

				const program = spawn('./public/src/program', ['']);

				program.stdout.on('data', (out) => {
					// console.log('Salida del programa');
					console.log(String(out));
					io.sockets.emit('update-out', String(out));
				});
			}

		});

	});


});




server.listen(3000, function() {
	var addr = server.address();
	console.log('Listening @ http://%s:%d', addr.address, addr.port);
})





