function simulate() {
  const CARDS = {
    0 : 'A♠',
    1 : '2♠',
    2 : '3♠',
    3 : '4♠',
    4 : '5♠',
    5 : '6♠',
    6 : '7♠',
    7 : '8♠',
    8 : '9♠',
    9 : 'T♠',
    10: 'J♠',
    11: 'Q♠',
    12: 'K♠',
    13: 'A♥',
    14: '2♥',
    15: '3♥',
    16: '4♥',
    17: '5♥',
    18: '6♥',
    19: '7♥',
    20: '8♥',
    21: '9♥',
    22: 'T♥',
    23: 'J♥',
    24: 'Q♥',
    25: 'K♥',
    26: 'A♦',
    27: '2♦',
    28: '3♦',
    29: '4♦',
    30: '5♦',
    31: '6♦',
    32: '7♦',
    33: '8♦',
    34: '9♦',
    35: 'T♦',
    36: 'J♦',
    37: 'Q♦',
    38: 'K♦',
    39: 'A♣',
    40: '2♣',
    41: '3♣',
    42: '4♣',
    43: '5♣',
    44: '6♣',
    45: '7♣',
    46: '8♣',
    47: '9♣',
    48: 'T♣',
    49: 'J♣',
    50: 'Q♣',
    51: 'K♣'
  };

  function getCard(num) {
    return (typeof CARDS[num] !== 'undefined' ? CARDS[num] : null);
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function getShuffledDeck() {
    return shuffle([...Array(52).keys()]);
  }

  var games = {win: 0, loss: 0};

  const SIMULATIONS = 100;

  console.log('Running...');

  for (let i = 0; i < SIMULATIONS; i++) {
    let deck = getShuffledDeck();

    let status = 'win';
    deck.some((c, i) => {
      if (c % 13 === i % 13) {
        console.log(getCard(c) + ' ' + getCard(i));
        status = 'loss';

        // Break out of our loop by returning "true"
        return true;
      }
    });

    // Tally our win or loss
    games[status] += 1;
  }



  console.log(`
    Wins: ${games.win}
    Losses: ${games.loss}
    ======
    Win Probability: ${games.win / SIMULATIONS * 100}%
  `);
}

simulate();