export const priceCalc = (total: number, spend: number): number => {
  return total - spend;
};

export const priceFormater = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});
