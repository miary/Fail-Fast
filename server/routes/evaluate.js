// server/routes/evaluate.js
const evaluateTech = (data) => {
  const { timeToValue, risk, cost } = data;
  
  // FAIL FAST RULES:
  // 1. If it takes > 3 months to see value, kill it.
  // 2. If it's high risk AND high cost, kill it.
  const isTooSlow = timeToValue > 12;
  const isTooRisky = (risk > 7 && cost > 50000);

  if (isTooSlow || isTooRisky) {
    return { 
      status: 'FAILED_FAST', 
      reason: isTooSlow ? "Velocity Threshold Exceeded" : "Risk/Cost Ratio Unacceptable" 
    };
  }

  return { status: 'PROTOTYPE_CANDIDATE', reason: "High Viability" };
};