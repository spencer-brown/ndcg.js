'use strict';

/**
 * Given an array of graded relevance scores, prints the discounted cumulative gain.
 *
 * Example usage:
 *  $ node dcg 1 2 3 4 2 3 1
 *
 */

function calculateDCG(gradedRelevanceScores) {
  const rel1 = gradedRelevanceScores[0];

  let summation = 0;
  for (let i = 1; i < gradedRelevanceScores.length; i++) {
    // We add 1 to the index to convert from 0-based indexing to 1-based indexing.
    summation += gradedRelevanceScores[i] / Math.log2(i + 1);
  }

  return rel1 + summation;
}

function calculateIDCG(gradedRelevanceScores) {
  let summation = 0;
  for (let i = 0; i < gradedRelevanceScores.length; i++) {
    /**
     * We add an additional 1 (1 --> 2) in the `log2` call to convert from 0-based indexing to
     * 1-based indexing.
     */

    summation += (Math.pow(2, gradedRelevanceScores[i]) - 1) / Math.log2(i + 2);
  }

  return summation;
}

function calculateNDCG(gradedRelevanceScores) {
  const intScores = gradedRelevanceScores.map((s) => parseInt(s, 10));
  return calculateDCG(intScores) / calculateIDCG(intScores);
}

if (process.argv.length < 3) {
  throw new Error('No relevance scores were provided. Please check usage instructions.');
}

const ndcg = calculateNDCG(process.argv.slice(2));
console.log('Calculated NDCG:', ndcg);
