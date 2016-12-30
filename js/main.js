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

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


ready(function() {
	var time_start, time_end;

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
				$1('#results .status #wins').innerText = numberWithCommas(e.data.games.win);
				$1('#results .status #losses').innerText = numberWithCommas(e.data.games.loss);
			} else if (e.data.type === 'final') {
				// Remove "loading" text
				$1('#results .loading').innerHTML = '<em>Finished</em>';
				$1('#results .loading').className = '';

				var win_percentage = e.data.games.win / e.data.number_of_simulations * 100;
				$1('#results .status').innerHTML = `<ul>
					<li>Wins: ${numberWithCommas(e.data.games.win)}</li>
					<li>Losses: ${numberWithCommas(e.data.games.loss)}</li>
					<li>Win Probability: <strong>${win_percentage.toFixed(3)}%</strong>
				</ul>`;

				$1('#win-probability').innerHTML = '<h1 class="probability"><strong>' + win_percentage.toFixed(3) + '%</strong> chance you will win this game.</h1>';

				$1('#win-probability').scrollIntoView();

				// Enable button
				$1('#submit-button').className = 'btn btn-primary';

				// Get execution time
				if (typeof performance.now !== 'undefined') {
					time_end = performance.now();
					console.log('Executed in ' + (time_end - time_start) + ' milliseconds');
				}
			}
		};

		$1('#submit-button').addEventListener('click', function(e) {
			e.preventDefault();
			if (typeof performance.now !== 'undefined') {
				time_start = performance.now();
			}

			// Get number of simulations (default is 100 if they enter a bad value)
			var number_of_simulations = parseInt(number_of_simulations_input.getRawValue());
			if (!(number_of_simulations > 0)) {
				number_of_simulations = 100;
				number_of_simulations_input.setRawValue(number_of_simulations);
			}

			$1('#results').innerHTML = `<div class="loading">Running</div>
				<div class="status">
					<ul>
					<li>Wins: <span id="wins"></span></li>
					<li>Losses: <span id="losses"></span></li>
				</ul>
			</div>`;

			$1('#win-probability').innerHTML = '';
			$1('#win-probability').scrollIntoView();

			this.className += " disabled";

			worker.postMessage([number_of_simulations]);
		});		
	} else {
		$1('#main').innerHTML = 'Sorry, your web browser must support ' + 
			'<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Workers</a> ' + 
			'in order to run this page.';
	}
});