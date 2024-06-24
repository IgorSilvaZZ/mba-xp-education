export const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

export function getToday() {
  return "2021-06-17";
}

export function formatMonth(isoMonth: string) {
  const [year, month] = isoMonth.split("-");

  const currentMonth = MONTHS[Number(month) - 1];

  const formattedMonth = `${currentMonth} de ${year}`;

  return formattedMonth;
}

export function addMonths(month: string, increment: number) {
  const jsDate = new Date(month + "-01T12:00:00");

  jsDate.setMonth(jsDate.getMonth() + increment);

  const newMonth = String(jsDate.getMonth() + 1).padStart(2, "0");
  const year = jsDate.getFullYear();

  return `${year}-${newMonth}`;
}
