export const formatCurrency = (
  price: number,
  currency: string = 'BRL',
): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(price);
};
