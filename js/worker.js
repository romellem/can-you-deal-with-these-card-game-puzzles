onmessage = function(e) {
	console.log('Message received');

	// Multiply by 2
	postMessage(e.data[0] * 2);
};