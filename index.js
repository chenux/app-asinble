
var compression = require('compression')
var express = require('express');
var app = express();
//var logger = require('morgan');
var server = require('http').Server(app);

var utils = require('./src/utils.js');
var spawn = require('child_process').spawn;
var entities = require("entities");

var config = require("./config.json");


var io = require('socket.io')(server);


//app.use(logger('dev'));
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


// Conexión.
io.on('connection', function(socket) {

	console.log('Cliente conectado');


	// Recibir y enviar código.
	socket.on('new-code', function(data) {

		code = data;
		//console.log(code);
		io.sockets.emit('update-code', code);

	});

	// Recibir y enviar el cursor.
	socket.on('new-cursor', function(cursor) {

		// console.log(cursor);
		io.sockets.emit('update-cursor', cursor);

	});

	// Recibir y enviar el selección.
	socket.on('new-selection', function(selection) {

		// console.log(selection);
		io.sockets.emit('update-selection', selection);

	});

	// Recibir y enviar los datos de entrada.
	socket.on('new-input', function(input) {
		// console.log(input);
		io.sockets.emit('update-input', input);
	});

	// Recibir el código.
	socket.on('new-build', function(data) {

		// Recibir borrado de salida.
		io.sockets.emit('update-clear', 'clear');

		utils.save_code(data.code);

		// Compilar.
		const gcc = spawn(config.compiler, [
			'./public/src/main.cpp', '-o', './public/src/program'
		]);

		// Enviar errores.
		gcc.stderr.on('data', (out) => {

			console.log( String('Código con errores'));
			io.sockets.emit('update-out', String(out));

		});

		// Enviar salida del programa.
		gcc.on('close', (code) => {

			if (code == 0) {

				console.log('Sin errores');

				// Ejecitar el porgrama
				const program = spawn('./public/src/program', ['']);

				program.stdin.write(data.input + '\n');
				program.stdin.end();

				program.stdout.on('data', (out) => {
					console.log('Salida del programa');
					io.sockets.emit('update-out', String(out));
				});
			}

		});

	});


});

//console.log(config);

server.listen( config.port, function() {
	var addr = server.address();
	console.log('Escuchando en %d', addr.port);
})





