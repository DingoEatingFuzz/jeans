var jeans = require('jeans');
var _ = require('lodash');

var coinMap: function() {
  P : 1,
  N : 5,
  D : 10,
  Q : 25,
  H : 50,
  $ : 100
};

var target = 500;
var numCoins = 100;

var coinKeys = Object.keys(coinMap);

function randomCoin() {
  return coinKeys[Math.floor(Math.random() * coinKeys.length)];
}

function crossover(arr1, arr2) {
  var splitPoint = Math.floor(Math.random() * numCoins);
  return arr1.slice(0, splitPoint).concat(arr2.slice(splitPoint));
}

module.exports = jeans.extend({
  spawn: function() {
    return {
      coins: _.range(numCoins).map(function() { return randomCoin(); })
    };
  },
  reproduce: function(parent1, parent2) {
    // Create a new individual using a crossover technique to pick parent alleles
    return {
      coins: crossover(parent1.coins, parent2.coins)
    };
  },
  fitnessFor: function(individual) {
    // fitness is how far the amount is from the target amount
    return Math.abs(targetAmount - individual
      .map(function(n) { return coinMap[n]; })
      .reduce(function(s, n) { return s + n; }, 0));
  },
  fitnessSorter: function(a, b) {
    // override fitness sorter to sort low - high
    return this.fitnessFor(b) - this.fitnessFor(a);
  },
  success: function(individual) {
    return this.fitnessFor(individual) === 0;
  },
  mutators: {
    coins: function(arr) {
      arr.forEach(function(v, i, a) {
        if (Math.random() < this.mutationRate) {
          // Use the mutation rate to determine whether or not the allele (coin) should change
          // Then use the set of coins to randomly switch the value in the coins array
          a[i] = randomCoin();
        }
      }, this);
    }
  }
});
