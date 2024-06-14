export const formattedNumber = (value) => {
  const numberFormatted = parseFloat(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return numberFormatted;
};
