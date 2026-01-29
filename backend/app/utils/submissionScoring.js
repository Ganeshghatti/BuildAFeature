/**
 * Calculates aiScores, totalScore, and testCaseResults for a submission.
 * Dummy implementation for now; replace with real scoring logic later.
 *
 * @param {Object} submission - Submission doc (may include vfsSnapshot, challengeId, etc.)
 * @returns {{ aiScores: object, totalScore: number, testCaseResults: Array<{ filePath: string, result: any }> }}
 */
function calculateSubmissionScores(submission) {
  // Dummy: fixed values. Replace with real AI scoring, test runner, etc.
  const aiScores = {
    codeQuality: 0.75,
    featureCompleteness: 0.8,
    performance: 0.7,
    _dummy: true,
  };

  const testCaseResults = [
    { filePath: 'tests/basic.test.js', result: { passed: true, duration: 12 } },
    { filePath: 'tests/edge.test.js', result: { passed: true, duration: 8 } },
    { filePath: 'tests/feature.test.js', result: { passed: false, duration: 5, message: 'Expected 2, got 1' } },
  ];

  const totalScore = 65;

  return {
    aiScores,
    totalScore,
    testCaseResults,
  };
}

module.exports = {
  calculateSubmissionScores,
};
