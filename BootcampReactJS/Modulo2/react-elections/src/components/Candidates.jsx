import { CandidateInfo } from "./CandidateInfo";

export const Candidates = () => {
  return (
    <div className='flex flex-col items-center gap-2 flex-1 overflow-y-auto h-[95%]'>
      <CandidateInfo />
      <CandidateInfo />
      <CandidateInfo />
      <CandidateInfo />
    </div>
  );
};
