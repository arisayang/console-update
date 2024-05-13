function parseAmount(amount, prefix = '$', suffix) {
  const amountNumber = parseInt(amount, 10);
  const prettyAmount = amountNumber.toLocaleString();

  if (amountNumber < 0) {
    return `-${prefix || ''}${prettyAmount.substring(1)}${suffix || ''}`;
  }

  return `${prefix || ''}${prettyAmount}${suffix || ''}`;
}

export default parseAmount;
