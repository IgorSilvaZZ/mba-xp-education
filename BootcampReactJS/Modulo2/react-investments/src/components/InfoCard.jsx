export const InfoCard = () => {
  return (
    <div className='flex gap-3 items-center justify-evenly h-12 w-full bg-white rounded-lg'>
      <span className='w-10 h-10 flex justify-center items-center rounded-full bg-purple-500 text-white'>
        JAN
      </span>
      <p>R$ 1.000,00</p>
      <p>+11,00%</p>
    </div>
  );
};
