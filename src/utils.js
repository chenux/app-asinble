
var fs = require('fs');

exports.save_code = function (code) {

	fs.writeFile('public/src/main.cpp', code, (err) => {
		if (err) throw err;
		console.log('Código guardado');
	});


}

//module.exports.save_code = save_code;