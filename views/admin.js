
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	lineNumbers: true,
	mode: "text/x-c++src",
	theme: "monokai",
	styleActiveLine: true,
	matchBrackets: true,
	indentUnit: 4,
	indentWithTabs: true,
	readOnly: false
});

console.log(location.origin);

var socket = io.connect(location.origin, { 'forceNew': true });


// Enviar código.
editor.on("change", function() {

	var code = editor.getValue()

	// console.log( code );
	socket.emit('new-code', code);

});


// Enviar selección o cursor.
editor.on("cursorActivity", function() {

	if ( editor.somethingSelected() ) {

		// console.log( editor.listSelections() );
		socket.emit('new-selection', editor.listSelections());

	} else {
		// console.log( editor.getCursor() );
		socket.emit('new-cursor', editor.getCursor());
	}

});



$( document ).ready(function() {

	$("#button_build").click(function() {

		socket.emit('new-build', editor.getValue());
	});

});


socket.on('update-out', function(out) {

	console.log(out);
	$('#out').append(out);

});

