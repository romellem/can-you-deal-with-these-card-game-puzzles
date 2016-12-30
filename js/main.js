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
		
	} else {
		document.getElementById('main').innerHTML = 'Sorry, your web browser must support <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Workers</a> in order to run this page.';
	}
});