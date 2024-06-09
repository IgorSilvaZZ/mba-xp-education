/* eslint-disable react/prop-types */

export const InfoCard = ({ numberMonth, value, percentMonth }) => {
  const colorPercent = percentMonth < 0 ? "text-red-600" : "text-green-600";

  const months = {
    1: "JAN",
    2: "FEV",
    3: "MAR",
    4: "ABR",
    5: "MAI",
    6: "JUN",
    7: "JUL",
    8: "AGO",
    9: "SET",
    10: "OUT",
    11: "NOV",
    12: "DEZ",
  };

  return (
    <div className='flex gap-3 items-center justify-evenly h-12 w-full bg-white rounded-lg'>
      <span className='w-10 h-10 flex justify-center items-center rounded-full bg-purple-500 text-white'>
        {months[numberMonth]}
      </span>
      <span className='w-20 text-center'>
        {Number(value).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
      <span className={`${colorPercent} text-center w-20`}>
        {Number(percentMonth).toFixed(2)}%
      </span>
    </div>
  );
};
