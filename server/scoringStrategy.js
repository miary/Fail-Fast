// server/logic/scoringStrategy.js
const calculateSurvival = (submission, weights) => {
  const { timeToValue, risk, costScore } = submission;
  
  // Calculate weighted score
  const survivalScore = 
    (10 * weights.value) - 
    (risk * weights.risk) - 
    (timeToValue * weights.time);

  // Return Decision Object
  return {
    isSurvivor: survivalScore > weights.threshold,
    score: survivalScore,
    ejectionForce: risk > 8 ? 'violent' : 'soft' // Determines animation style
  };
};