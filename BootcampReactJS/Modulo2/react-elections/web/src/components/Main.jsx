/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import { Candidates } from "./Candidates";
import { CardsInfos } from "./CardsInfos";
import { CardInfo } from "./CardInfo";
import { CandidateInfo } from "./CandidateInfo";

import { api } from "../lib/axios";

export const Main = () => {
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState(null);

  const [candidates, setCandidates] = useState([]);

  const [electionsInfo, setElectionsInfo] = useState([]);

  async function getInfoElectionCity(cityId, allCandidates) {
    const { data: dataElection } = await api.get("/election", {
      params: {
        cityId,
      },
    });

    const infoElection = dataElection
      .map((election) => {
        const candidate = allCandidates.find(
          (candidateItem) => candidateItem.id === election.candidateId
        );

        return {
          ...election,
          candidateElection: false,
          candidate: {
            ...candidate,
            percent: 0,
          },
        };
      })
      .sort((a, b) => b.votes - a.votes);

    const totalVotes = infoElection.reduce(
      (acc, candidate) => acc + candidate.votes,
      0
    );

    let maxVotes = 0;

    for (let info of infoElection) {
      const percent = (info.votes / totalVotes) * 100;
      info.candidate.percent = percent.toFixed(2);

      if (info.votes > maxVotes) {
        maxVotes = info.votes;
        info.candidateElection = true;
      }
    }

    setElectionsInfo(infoElection);
  }

  async function handleSelectedCity({ target }) {
    const selectCityId = target.value;

    const city = cities.find((item) => item.id === selectCityId);

    setCitySelected(city);

    await getInfoElectionCity(city.id, candidates);
  }

  useEffect(() => {
    (async () => {
      // Colocar Promise.all nessas duas chamadas
      const { data: dataCities } = await api.get("/cities");

      const { data: dataCandidates } = await api.get("/candidates");

      const firstCity = dataCities[0];

      setCities(dataCities);
      setCitySelected(firstCity);

      setCandidates(dataCandidates);

      await getInfoElectionCity(firstCity.id, dataCandidates);
    })();
  }, []);

  return (
    <div className='w-full flex flex-col flex-1 px-10 gap-10 leading-tight'>
      <div className='w-1/2 flex flex-col gap-3'>
        <span className='text-2xl text-white'>NFKey Governance</span>
        <p className='text-base text-gray-500'>
          You can vote on each proposal yourself or delegate your votes to a
          third party.
        </p>
      </div>

      <div className='flex w-full items-center justify-between'>
        <span className='text-xl text-white font-semibold'>
          Eleições {citySelected?.name}
        </span>

        <select
          className='bg-zinc-900 p-3 text-white text-sm w-56 rounded-xl border border-white outline-none'
          onChange={handleSelectedCity}
        >
          {cities.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex gap-10 w-full h-full'>
        <CardsInfos>
          <div className='w-full flex gap-2'>
            <CardInfo
              value={citySelected?.votingPopulation}
              description='Total de Eleitores'
            />
            <CardInfo value={citySelected?.absence} description='Abstenção' />
          </div>
          <div className='w-full flex gap-2'>
            <CardInfo
              value={citySelected?.presence}
              description='Comparecimento'
            />
            <CardInfo value={electionsInfo.length} description='Candidatos' />
          </div>
        </CardsInfos>

        <Candidates>
          {electionsInfo.map((election) => (
            <CandidateInfo
              key={election.id}
              nameCandidate={election.candidate.name}
              userNameCandidate={election.candidate.username}
              percent={election.candidate.percent}
              votes={election.votes}
              candidateElection={election.candidateElection}
            />
          ))}
        </Candidates>
      </div>
    </div>
  );
};
