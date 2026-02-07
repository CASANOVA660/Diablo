export const CURRENCIES = [
  { value: 'USD', label: 'US Dollars ($)', symbol: '$' },
  { value: 'AED', label: 'AED', symbol: 'AED ' },
  { value: 'DT', label: 'Tunisian Dinar (DT)', symbol: 'DT ' },
];

export const getCurrencySymbol = (currency) => {
  const c = CURRENCIES.find((x) => x.value === (currency || 'USD'));
  return c ? c.symbol : '$';
};

/** Price after discount (0–100 percent) */
export const getEffectivePrice = (product) => {
  if (!product || typeof product.price !== 'number') return 0;
  const p = product.price;
  const discount = Math.min(100, Math.max(0, Number(product.discountPercent) || 0));
  return Math.round(p * (1 - discount / 100) * 100) / 100;
};

/** Format amount with currency symbol */
export const formatPrice = (amount, currency = 'USD') => {
  const symbol = getCurrencySymbol(currency);
  const n = Number(amount);
  if (isNaN(n)) return `${symbol}0`;
  return `${symbol}${n.toFixed(2)}`;
};
