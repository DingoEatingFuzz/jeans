var Coins = require('./coins');

// Create an instance of our Coins genetic algorithm
var ga = new Coins({
  populationSize : 500,
  mutationRate   : 0.01,
  elitismBias    : 0.2
});

// The match property is undefined until something meets the success criteria
while(!ga.match) {
  ga.step();
  console.log('Generation: ' + ga.generation + ' Best Fitness: ' + ga.fitnessFor(ga.best));
}

console.log('\n\n');
console.log('Match Found!');
console.log(histogram(ga.match.coins));

function histogram(a) {
  return JSON.stringify(a.reduce(function(h, n) {
    h[n] ? h[n]++ : h[n] = 1;
    return h;
  }, {}), undefined, 2);
}
