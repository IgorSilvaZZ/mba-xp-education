const data = require("./campeonato-brasileiro.json");

const year = 2003;

const yearFiltered = data[year];

/* Todo List Inicial
    # Total de gols feitos (independente se é casa ou fora/soma de ambos)
    # Total de gols sofridos (independente se é casa ou fora/soma de ambos)
    # Total de Vitorias (independente se é casa ou fora/soma de ambos)
    # Total de Derrotas (independente se é casa ou fora/soma de ambos)
    # Saldo de gols (Gols Feitos - Gols Sofridos)
    # Total de Pontos do time (Vitorias + Empates)
*/

const matchesLastRound = yearFiltered[yearFiltered.length - 1].partidas;

const visitors = [];
const principal = [];

for (const matchItem of matchesLastRound) {
  if (
    !visitors.find((visitorItem) => visitorItem.name === matchItem.visitante)
  ) {
    visitors.push({
      name: matchItem.visitante,
      totalPoints: matchItem.pontuacao_geral_visitante.total_pontos,
    });
  }

  if (
    !principal.find(
      (principalItem) => principalItem.name === matchItem.mandante
    )
  ) {
    principal.push({
      name: matchItem.mandante,
      totalPoints: matchItem.pontuacao_geral_mandante.total_pontos,
    });
  }
}

/* console.log("Visitantes: ");
console.log(visitors);
console.log("Mandantes: ");
console.log(principal); */

/* const allMatches = [visitors, principal].flat(); */
const allMatches = [...visitors, ...principal];

const sortedMatches = allMatches.sort((a, b) => b.totalPoints - a.totalPoints);

console.log(sortedMatches);
