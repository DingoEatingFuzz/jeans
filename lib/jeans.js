var _ = require('lodash');
var extend = require('./extend');

var jeans = function(opts) {
  _.assign(this, opts);
  // verify object for required properties

  this.eliteSize = Math.ceil(this.elitismBias / 2 * this.populationSize);
  this.population = [];
  this.generation = 0;
  for (var i = 0; i < this.populationSize; i++) {
    this.population.push(this.spawn());
  }
};

jeans.prototype = {
  step: function() {
    this.generation++;
    this.population.sort(this.fitnessSorter.bind(this));
    var best = this.best = this.population[0];

    if (this.success(best)) {
      this.match = best;
    }

    var parents = this.population.slice(0, this.eliteSize);
    parents.concat(roulette(this, this.populationSize / 2 - this.eliteSize, this.population.slice(this.eliteSize)));

    var children = [];
    for (var i = 0; i < this.populationSize; i++) {
      children.push(this.reproduce(
        parents[Math.floor(Math.random() * parents.length)],
        parents[Math.floor(Math.random() * parents.length)]
      ));
    }

    this.population = children;
  },
  fitnessSorter: function(a, b) {
    return this.fitnessFor(b) - this.fitnessFor(a);
  },
  success: function(individual) {
    return this.fitnessFor(individual) === 1;
  }
};

jeans.extend = extend;

function roulette(ga, count, arr) {
  var result = [];

  var wheel = arr.reduce(function(prior, individual) {
    prior.push((prior[prior.length - 1] || 0) + ga.fitnessFor(individual));
    return prior;
  }, []);

  var max = wheel[wheel.length - 1];

  for (var i = 0; i < count; i++) {
    // |-----|--|-|---|------|---|---------|
    var spin = Math.random() * max;
    var idx = find(spin, wheel);

    var winner = arr[idx];
    var fitness = ga.fitnessFor(winner);

    result.push(winner);
    wheel.splice(idx, 1);
    arr.splice(idx, 1);

    for (var j = idx; j < wheel.length; j++) {
      wheel[j] -= fitness;
    }

    max -= fitness;
  }

  return result;

  // binary search
  function find(spin, wheel, s, e) {
    if (s === undefined) s = 0;
    if (e === undefined) e = wheel.length - 1;

    var i = Math.floor((e - s) / 2 + s);
    if (wheel[i] < spin && (i + 1 >= wheel.length || wheel[i + 1] > spin)) {
      return i;
    } else if (wheel[i] > spin) {
      // left side
      if (i === 0) { return 0; }
      return find(spin, wheel, s, e - ((e - s) / 2));
    } else {
      // right side
      if (i === wheel.length - 1) { return i; }
      return find(spin, wheel, s + ((e - s) / 2), e);
    }
  }
}

module.exports = jeans;
