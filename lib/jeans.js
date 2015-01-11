var _ = require('lodash');

var jeans = function(opts) {
   _.assign(this, opts);
   // verify object for required properties
};

jeans.prototype = Object.create(Object.prototype, {
  population: [],
  step: function() {
    this.population.sort(this.fitnessSorter);
    var parents = this.population.slice(0, this.eliteSize);
  },
  fitnessSorter = function(a, b) {
    return a.fitness - b.fitness;
  }
});

exports = jeans;
