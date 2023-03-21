export function calcScore(store) {
  //Reducing total score (evaluated + graded)
  const runningScore = store.evaluations.reduce((acc, value) => {
    return acc + value.score;
  }, 0);

  return runningScore;
}
