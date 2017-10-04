
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	lineNumbers: true,
	mode: "text/x-c++src",
	theme: "mdn-like",
	styleActiveLine: true,
	matchBrackets: true,
	indentUnit: 4,
	indentWithTabs: true,
	readOnly: true
});

console.log(location.origin);

var socket = io.connect(location.origin, { 'forceNew': true });


socket.on('update-code', function(code) {

	console.log(code);

	editor.setValue(code);
	//editor.setCursor(data.cursor);

});


socket.on('update-cursor', function(cursor) {

	editor.setCursor(cursor);

});

socket.on('update-selection', function(selection) {

	editor.setSelections(selection);

});

// Recibir datos de entrada.
socket.on('update-input', function(input) {

	$("#input_text").val(input);

});

