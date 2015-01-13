var jeans = require('../../lib/jeans');
var _ = require('lodash');

var coinMap = {
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
    // fitness is the inverse of how far the amount is from the target amount
    var sum = individual.coins
      .map(function(n) { return coinMap[n]; })
      .reduce(function(s, n) { return s + n; }, 0);

    var f = 1 / (1 + Math.abs(target - sum));
    if (individual.coins.indexOf('$') === -1) {
      f -= 0.2;
    }
    return f;
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
      return arr;
    }
  }
});
