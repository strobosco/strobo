export const useCalculateVote = (
  points: number,
  value: number,
  voteStatus: number | null
) => {
  if (voteStatus === value) {
    return;
  }
  if (!voteStatus || points === 0) {
    return points + value;
  }
  return points + 2 * value;
};
