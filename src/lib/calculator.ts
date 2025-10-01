export function calculateWeightedScore(matricResult: number, uatResult: number): number {
  // Formula: Score = (Matric ÷ 12) + (UAT ÷ 2)
  const score = (matricResult / 12) + (uatResult / 2);
  return Number(score.toFixed(2));
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
