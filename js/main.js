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
		var number_of_simulations_input = new Cleave('#simulations', {
			numeral: true,
			numeralThousandsGroupStyle: 'thousand'
		});

		// Browser supports Web Workers
		var worker = new Worker('./js/worker.js');

		worker.onmessage = function(e) {
			if (e.data.type === 'update') {
				$1('#results .status').innerHTML = `<ul>
					<li>Wins: ${e.data.games.win}</li>
					<li>Losses: ${e.data.games.loss}</li>
				</ul>`;
			} else if (e.data.type === 'final') {
				$1('#results .status').innerHTML = `<ul>
					<li>Wins: ${e.data.games.win}</li>
					<li>Losses: ${e.data.games.loss}</li>
					<li>Win Probability: ${e.data.games.win / e.data.number_of_simulations}
				</ul>`;

				// Enable button
				$1('#submit-button').className = 'btn btn-primary';
			}
		};

		$1('#submit-button').addEventListener('click', function(e) {
			e.preventDefault();

			// Get number of simulations (default is 100 if they enter a bad value)
			var number_of_simulations = parseInt(number_of_simulations_input.getRawValue());
			if (!(number_of_simulations > 0)) {
				number_of_simulations = 100;
				number_of_simulations_input.setRawValue(number_of_simulations);
			}

			$1('#results').innerHTML = '<div class="loading">Running</div><div class="status"></div>';
			this.className += " disable";

			worker.postMessage([number_of_simulations]);
		});

		

		
	} else {
		$1('#main').innerHTML = 'Sorry, your web browser must support ' + 
			'<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Workers</a> ' + 
			'in order to run this page.';
	}
});