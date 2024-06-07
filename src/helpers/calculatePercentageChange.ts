const calculatePercentageChange = (baseAmount, comparisonAmount) => {
  const gap = Math.round(((baseAmount - comparisonAmount) / (Number(comparisonAmount) || 1)) * 100);
  return Math.abs(gap);
};

export default calculatePercentageChange;
