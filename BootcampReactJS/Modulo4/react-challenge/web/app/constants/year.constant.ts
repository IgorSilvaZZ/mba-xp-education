const START_YEAR = 2003;
const END_YEAR = 2015;

export const years = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (value, index) => {
    return String(START_YEAR + Number(index));
  }
);
