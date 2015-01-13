## jeans

Genetic Algorithms in javascript

#### Overview

Genetic algorithms are a class of search, or hill-climbing, algorithms. It searchs through a potential solutions landscape looking for a "good enough" solution. That is, even if there is a *best* answer, we don't care; we are only interested in an answer that meets our requirements.

Check out the examples for more explanation.

#### Features

This is a barebones implementation that supports crossover, mutation, and elitism bias.

#### Details

**Genetic Algorithm**

- `populationSize` - The number of individuals in each generation
- `mutationRate` - A value from 0 - 1 that describes the percent chance an allele will mutate
- `elitismBias` - A value from 0 - 1 that describes the percent of the top population that will be guaranteed parents for the next generation. *When `elitismBias` is 0, all parents are selected based on weighted chance using their fitness score.
- `success` - A function that takes an individual to evaluate if it is successful. That is, it meets the search criteria.
- `mutators` - An object representing how to mutate a chromosome, where the key is the name of the chromosome to mutate, and the value is the mutator function.
- `mutator function` - A function that takes the data for a chromosome and the `mutationRate`
- `spawn` - A function that takes no arguments that creates a new individual. This is called on init n times, where n is the population size
- `reproduce` - A function that takes two arguments, where each argument is an individual

#### Examples

Check out the examples directory for simple usages of genetic algorithms (and jeans).

**Coins** - Find a collection of 100 coins that adds up to $5. For fun, require that one coin be a dollar coin.
