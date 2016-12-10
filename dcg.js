'use strict';

/**
 * Given an array of graded relevance scores, prints the discounted cumulative gain.
 *
 * Example usage:
 *  $ node dcg 1 2 3 4 2 3 1
 *
 */

function calculateDCG(gradedRelevanceScores) {
  const intScores = gradedRelevanceScores.map((s) => parseInt(s, 10));
  const rel1 = gradedRelevanceScores[0];

  let summation = 0;
  for (let i = 1; i < intScores.length; i++) {
    // We add 1 to the index to convert from 0-based indexing to 1-based indexing.
    summation += intScores[i] / Math.log2(i + 1);
  }

  return rel1 + summation;
}

if (process.argv.length < 3) {
  throw new Error('No relevance scores were provided. Please check usage instructions.');
}

const dcg = calculateDCG(process.argv.slice(2));
console.log('Calculated DCG:', dcg);
