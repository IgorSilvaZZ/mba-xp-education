export function getAgeFrom(birthDate) {
  if (!birthDate) {
    return "?";
  }

  const [year, month, day] = String(birthDate).split("-").map(Number);

  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const age = currentYear - year;

  if (month > currentMonth) {
    return age - 1;
  }

  if (month === currentMonth && day > currentDay) {
    return age - 1;
  }

  return age;
}
