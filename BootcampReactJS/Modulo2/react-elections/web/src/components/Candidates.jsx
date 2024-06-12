/* eslint-disable react/prop-types */

export const Candidates = ({ children: candidatesCards }) => {
  return (
    <div className='flex flex-col items-center gap-2 w-[60%] overflow-y-auto h-[300px] max-h-[500px]'>
      {candidatesCards}
    </div>
  );
};
