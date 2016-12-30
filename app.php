<?php

class Deck {
  /**
   * @var array
   */
  public $deck;

  /**
   * @var double
   */
  public $win_probability;

  public $wins;
  public $losses;

  const CARDS = [
    0  => 'A♠',
    1  => '2♠',
    2  => '3♠',
    3  => '4♠',
    4  => '5♠',
    5  => '6♠',
    6  => '7♠',
    7  => '8♠',
    8  => '9♠',
    9  => 'T♠',
    10 => 'J♠',
    11 => 'Q♠',
    12 => 'K♠',
    13 => 'A♥',
    14 => '2♥',
    15 => '3♥',
    16 => '4♥',
    17 => '5♥',
    18 => '6♥',
    19 => '7♥',
    20 => '8♥',
    21 => '9♥',
    22 => 'T♥',
    23 => 'J♥',
    24 => 'Q♥',
    25 => 'K♥',
    26 => 'A♦',
    27 => '2♦',
    28 => '3♦',
    29 => '4♦',
    30 => '5♦',
    31 => '6♦',
    32 => '7♦',
    33 => '8♦',
    34 => '9♦',
    35 => 'T♦',
    36 => 'J♦',
    37 => 'Q♦',
    38 => 'K♦',
    39 => 'A♣',
    40 => '2♣',
    41 => '3♣',
    42 => '4♣',
    43 => '5♣',
    44 => '6♣',
    45 => '7♣',
    46 => '8♣',
    47 => '9♣',
    48 => 'T♣',
    49 => 'J♣',
    50 => 'Q♣',
    51 => 'K♣'
  ];

  public function __construct() {
    $this->deck = range(0, 51);
  }

  public function getCard($card) {
    return self::CARDS[$card];
  }

  public function getCardValue($card) {
    return $this->getCard($card)[0];
  }

  public function shuffleDeck() {
    shuffle($this->deck);

    // Rekey the deck
    $this->deck = array_values($this->deck);
    return $this->deck;
  }

  public function printWithHighlights() {
    // Echo A  2  3  4 (etc.)
    echo "\033[92m";
    for ($i = 0; $i < 13; $i++) {
      echo $this->getCardValue($i) . "  ";
    }
    echo "\033[0m";
    echo "\n" . "--------------------------------------" . "\n";

    for ($s = 0; $s < 4; $s++) {
      for ($v = 0; $v < 13; $v++) {
        $card = $this->deck[(13 * $s) + $v];

        // Invert card color if it is aligned
        if ($card % 13 === $v) {
          echo "\033[7m";
        }

        echo $this->getCard($card);

        echo "\033[0m";
        echo " ";
      }

      echo "\n";
    }

    echo "\n";
  }

  public function wouldWin() {
    foreach($this->deck as $i => $card) {
      if ($card % 13 === $i % 13) {
        return false;
      }
    }

    // Otherwise, we won!
    return true;
  }

  public function simulate($times = 100, $print = false) {
    
  }
}

class Game {
  public $wins;
  public $losses;

  public $simulations;

  public function __construct($simulations = 10000) {
    $this->simulations = $simulations;
    $this->wins = 0;
    $this->losses = 0;
  }

  public function getWinProbability($as_percent = false) {
    return ($this->wins / $this->simulations * ($as_percent ? 100 : 1));
  }

  public function simulate($print = false) {
    $deck = new Deck();
    for ($i = 0; $i < $this->simulations; $i++) {
      $deck->shuffleDeck();

      $game_status = $deck->wouldWin();

      if ($game_status) {
        $this->wins += 1;
      } else {
        $this->losses += 1;
      }

      if ($print) {
        // Print game
        echo ($game_status ? "WINNER\n" : "LOSER\n");
        $deck->printWithHighlights();
      }
    }

    if ($print) {
      echo "======================================\n";
      $win_probability_percentage = $this->getWinProbability(true);
      echo "Wins:     {$games['win']}\nLosses:   {$games['loss']}\nWin Prob: {$win_probability}%\n";
    }
  }
}


$game_results = [];
echo "Running simulation: ";
for ($i = 0; $i < 1000; $i++) {
  if ($i % 10 === 0) {
    echo $i . ", ";
  }
  
  $game = new Game();
  $game->simulate();

  $game_results[] = $game->getWinProbability();
}

echo "==========\n";
$win_average = array_sum($game_results) / count($game_results);
echo $win_average;
