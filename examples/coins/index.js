var Coins = require('coins');

// Create an instance of our Coins genetic algorithm
var ga = new Coins({
  populationSize : 1000,
  mutationRate   : 0.2,
  elitismBias    : 0.2
});

// The match property is undefined until something meets the success criteria
while(!ga.match) {
  ga.step();
  console.log('Generation: ' + ga.generation + ' Best Fitness: ' + ga.fitnessFor(ga.best));
  console.log('\t' + ga.best.coins.join(', '));
}

console.log('\n\n');
console.log('Match Found!');
console.log(ga.match.coins.join(', '));
