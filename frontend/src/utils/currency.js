const indianNumber = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

export function formatIndianNumber(value) {
  return indianNumber.format(Number(value) || 0);
}

export function formatINR(value) {
  return `₹${formatIndianNumber(value)}`;
}
