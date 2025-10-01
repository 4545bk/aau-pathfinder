export function calculateWeightedScore(matricResult: number, uatResult: number): number {
  // Formula: X = (matric / 420) * 60 + (uat / 160) * 40
  const matricScore = (matricResult / 420) * 60;
  const uatScore = (uatResult / 160) * 40;
  return Number((matricScore + uatScore).toFixed(2));
}

export function checkEligibility(
  score: number,
  cutoff: number
): { passed: boolean; difference: number } {
  return {
    passed: score >= cutoff,
    difference: score - cutoff,
  };
}
