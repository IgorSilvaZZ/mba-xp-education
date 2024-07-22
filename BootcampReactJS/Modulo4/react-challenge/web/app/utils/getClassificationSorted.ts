import { IMatch, IMatches } from "../interfaces/IMatches";
import { IParticipantInfoMatch } from "../interfaces/IParticipantInfoMatch";
import { IPointsMatch } from "../interfaces/IPointsMatch";

const getInfoTeamMatch = (
  teamMatcher: IMatch,
  typeTeamMatcher: "visitante" | "mandante"
) => {
  const nameTeamMatcher = teamMatcher[typeTeamMatcher];

  const propertyResultsTeamMatcher = `pontuacao_geral_${typeTeamMatcher}` as
    | "pontuacao_geral_mandante"
    | "pontuacao_geral_visitante";

  const resultsTeamMatcher = teamMatcher[
    propertyResultsTeamMatcher
  ] as IPointsMatch;

  const {
    total_gols_marcados,
    total_gols_sofridos,
    total_pontos,
    total_vitorias,
    total_empates,
    total_derrotas,
  } = resultsTeamMatcher;

  const balanceGoals = total_gols_marcados - total_gols_sofridos;

  return {
    name: nameTeamMatcher,
    totalPoints: total_pontos,
    totalVictories: total_vitorias,
    totalDraw: total_empates,
    totalDefeats: total_derrotas,
    goalsScored: total_gols_marcados,
    goalsConceded: total_gols_sofridos,
    balanceGoals,
  };
};

export const getClassificationSorted = async (dataMatch: IMatches[]) => {
  const visitors: IParticipantInfoMatch[] = [];
  const principal: IParticipantInfoMatch[] = [];

  const matchesLastRound = dataMatch[dataMatch.length - 1].partidas;

  for (const matchItem of matchesLastRound) {
    const { visitante: nameVisitor, mandante: namePrincipal } = matchItem;

    if (!visitors.find((visitorItem) => visitorItem.name === nameVisitor)) {
      const visitorInfo = getInfoTeamMatch(matchItem, "visitante");

      visitors.push(visitorInfo);
    }

    if (
      !principal.find((principalItem) => principalItem.name === namePrincipal)
    ) {
      const principalInfo = getInfoTeamMatch(matchItem, "mandante");

      principal.push(principalInfo);
    }
  }

  /* const allMatches = [visitors, principal].flat(); */
  const allMatches = [...visitors, ...principal];

  const sortedMatches = allMatches.sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  return sortedMatches;
};
