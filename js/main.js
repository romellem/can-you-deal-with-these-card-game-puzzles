function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}


ready(function() {
	if (window.Worker) {
		// Browser supports Web Workers
		var worker = new Worker('./js/worker.js');

		worker.onmessage = function(e) {
			console.log('From worker:' + e.data);
		};

		worker.postMessage([5]);
	} else {
		document.getElementById('main').innerHTML = 'Sorry, your web browser must support ' + 
			'<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Workers</a>' + 
			'in order to run this page.';
	}
});