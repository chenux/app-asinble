
socket.on('update-clear', function(out) {

	$('#out').html('');

});

socket.on('update-out', function(out) {

	console.log(out);
	$('#out').append(out);

});