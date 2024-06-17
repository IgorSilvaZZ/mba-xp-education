/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { formattedNumber } from "../utils/formattedNumber";

export const CandidateInfo = ({
  nameCandidate,
  userNameCandidate,
  votes,
  percent,
  candidateElection,
}) => {
  const candidateImage = `../../public/${userNameCandidate}.png`;

  const colorElected = candidateElection ? "text-green-500" : "text-yellow-500";

  return (
    <div className='w-full flex items-center justify-between h-20 rounded-xl shadow-lg bg-zinc-800 px-4'>
      <div className='w-1/3 h-full flex items-center gap-4'>
        <div className='flex w-32 h-12'>
          <img
            className='rounded-full'
            src={candidateImage}
            alt='user-male--v1'
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-white text-lg'>{nameCandidate}</p>
          <span className='text-sm font-semibold text-gray-400 w-44'>
            {formattedNumber(votes)} voto(s)
          </span>
        </div>
      </div>
      <span className='text-white text-sm'>{percent}%</span>
      <span className={`text-white w-32 text-center ${colorElected}`}>
        {candidateElection ? "Eleito" : "Não Eleito"}
      </span>
    </div>
  );
};
