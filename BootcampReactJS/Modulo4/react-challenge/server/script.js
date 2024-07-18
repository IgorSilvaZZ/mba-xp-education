const data = require("./campeonato-brasileiro.json");

const year = 2003;

const yearFiltered = data[year];

/* Todo List Inicial
    # Total de gols feitos (independente se é casa ou fora/soma de ambos)
    # Total de gols sofridos (independente se é casa ou fora/soma de ambos)
    # Total de Vitorias (independente se é casa ou fora/soma de ambos)
    # Total de Derrotas (independente se é casa ou fora/soma de ambos)
    # Total de Empates(independente se é casa ou fora/soma de ambos)
    # Saldo de gols (Gols Feitos - Gols Sofridos)
    # Total de Pontos do time (Vitorias + Empates)
*/

const matchesLastRound = yearFiltered[yearFiltered.length - 1].partidas;

const visitors = [];
const principal = [];

/* typeTeamMatcher => visitante ou mandante */
const getInfoTeamMatch = (teamMatcher, typeTeamMatcher) => {
  const nameTeamMatcher = teamMatcher[typeTeamMatcher];

  const propertyResultsTeamMatcher = `pontuacao_geral_${typeTeamMatcher}`;

  const resultsTeamMatcher = teamMatcher[propertyResultsTeamMatcher];

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

const sortedMatches = allMatches.sort((a, b) => b.totalPoints - a.totalPoints);

console.log(sortedMatches);
