


var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
	lineNumbers: true,
	mode: 'text/x-c++src',
	theme: 'mdn-like',
	styleActiveLine: true,
	matchBrackets: true,
	indentUnit: 4,
	indentWithTabs: true,
	readOnly: false
});

console.log(location.origin);

var socket = io.connect(location.origin, { 'forceNew': true });


// Enviar código.
editor.on('change', function() {

	var code = editor.getValue()

	// console.log( code );
	socket.emit('new-code', code);

});

// Enviar datos de entrada.
$('#input_text').bind('input propertychange', function() {

	var input = $('#input_text').val();
	socket.emit('new-input', input);

});

// Enviar selección o cursor.
editor.on('cursorActivity', function() {

	if ( editor.somethingSelected() ) {

		// console.log( editor.listSelections() );
		socket.emit('new-selection', editor.listSelections());

	} else {
		// console.log( editor.getCursor() );
		socket.emit('new-cursor', editor.getCursor());
	}

});


// Compilar.
$( document ).ready(function() {

	// Enviar código.
	$('#button_build').click(function() {

		var data = {
			'input' : $('#input_text').val(),
			'code'  : editor.getValue()
		};

		socket.emit('new-build', data);
	});



});



