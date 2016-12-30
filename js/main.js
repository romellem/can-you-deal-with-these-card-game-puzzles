function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

// @link https://plainjs.com/javascript/selecting/select-dom-elements-by-css-selectors-4/
// select a list of matching elements, context is optional
function $(selector, context) {
    return (context || document).querySelectorAll(selector);
}

// select the first match only, context is optional
function $1(selector, context) {
    return (context || document).querySelector(selector);
}


ready(function() {
	if (window.Worker) {
		// Style numeral input
		var cleave = new Cleave('#simulations', {
			numeral: true,
			numeralThousandsGroupStyle: 'thousand'
		});

		$1('#submit-button').addEventListener('click', function(e) {
			e.preventDefault();

			console.log('hello');
		});

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